"""
Firebase Admin SDK service — verifies phone auth idTokens.

Set ONE of these in backend/.env:

  # Option A - JSON key file path
  FIREBASE_CREDENTIALS_PATH=/path/to/serviceAccountKey.json

  # Option B - JSON string (for hosting environments)
  FIREBASE_CREDENTIALS_JSON={"type":"service_account","project_id":"..."}

  # Option C - just the project ID (uses Application Default Credentials)
  FIREBASE_PROJECT_ID=your-project-id
"""

import os
import json

_initialized = False

def _init_firebase():
    global _initialized
    if _initialized:
        return

    import firebase_admin
    from firebase_admin import credentials

    if firebase_admin._apps:
        _initialized = True
        return

    cred_path = os.environ.get('FIREBASE_CREDENTIALS_PATH')
    cred_json = os.environ.get('FIREBASE_CREDENTIALS_JSON')
    project_id = os.environ.get('FIREBASE_PROJECT_ID')

    if cred_path and os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    elif cred_json:
        cred = credentials.Certificate(json.loads(cred_json))
        firebase_admin.initialize_app(cred)
    elif project_id:
        # Application Default Credentials (Google Cloud / Cloud Run environments)
        firebase_admin.initialize_app(options={'projectId': project_id})
    else:
        raise RuntimeError(
            'Firebase not configured. Set FIREBASE_CREDENTIALS_PATH, '
            'FIREBASE_CREDENTIALS_JSON, or FIREBASE_PROJECT_ID in backend/.env'
        )

    _initialized = True


def verify_firebase_id_token(id_token: str) -> dict:
    """
    Verify a Firebase ID token and return the decoded payload.
    Returns a dict with at least: uid, phone_number (for phone auth tokens).
    Raises ValueError on invalid / expired token.
    """
    _init_firebase()
    from firebase_admin import auth as firebase_auth

    try:
        decoded = firebase_auth.verify_id_token(id_token)
        return decoded
    except Exception as exc:
        raise ValueError(f'Invalid Firebase token: {exc}') from exc
