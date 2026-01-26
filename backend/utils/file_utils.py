"""
Utility functions
"""

import os
from werkzeug.utils import secure_filename
from config import Config

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def save_uploaded_file(file, folder='properties'):
    """Save uploaded file and return the path"""
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        # Create unique filename
        import uuid
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        
        # Create folder if it doesn't exist
        upload_path = os.path.join(Config.UPLOAD_FOLDER, folder)
        os.makedirs(upload_path, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_path, unique_filename)
        file.save(file_path)
        
        # Return relative path
        return f"/uploads/{folder}/{unique_filename}"
    
    return None

def delete_file(file_path):
    """Delete a file from the filesystem"""
    try:
        full_path = os.path.join(os.path.dirname(__file__), '..', file_path.lstrip('/'))
        if os.path.exists(full_path):
            os.remove(full_path)
            return True
        return False
    except Exception as e:
        print(f"Error deleting file: {str(e)}")
        return False
