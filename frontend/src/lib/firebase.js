/**
 * Firebase client SDK — lazy initialization.
 *
 * getFirebaseAuth() is only called when the user actually triggers phone OTP,
 * so missing / placeholder env vars don't crash the whole app at startup.
 *
 * Fill in frontend/.env:
 *   VITE_FIREBASE_API_KEY=...
 *   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
 *   VITE_FIREBASE_PROJECT_ID=your-project-id
 *   VITE_FIREBASE_APP_ID=...
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let _auth = null;

export function getFirebaseAuth() {
    if (_auth) return _auth;

    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (!apiKey || apiKey.startsWith('your_firebase')) {
        throw new Error(
            'Firebase is not configured.\n' +
            'Add your Firebase project credentials to frontend/.env:\n' +
            '  VITE_FIREBASE_API_KEY=...\n' +
            '  VITE_FIREBASE_AUTH_DOMAIN=...\n' +
            '  VITE_FIREBASE_PROJECT_ID=...\n' +
            '  VITE_FIREBASE_APP_ID=...'
        );
    }

    const firebaseConfig = {
        apiKey,
        authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId:             import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    _auth = getAuth(app);
    return _auth;
}
