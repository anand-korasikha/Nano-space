"""
File upload routes
"""

from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required
import os
from werkzeug.utils import secure_filename
import uuid

upload_bp = Blueprint('upload', __name__)

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/image', methods=['POST'])
@jwt_required()
def upload_image():
    """Upload an image file"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Add unique ID to filename to avoid collisions
            name, ext = os.path.splitext(filename)
            unique_filename = f"{name}_{uuid.uuid4().hex[:8]}{ext}"
            
            upload_path = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            if not os.path.exists(upload_path):
                os.makedirs(upload_path)
            
            file_path = os.path.join(upload_path, unique_filename)
            file.save(file_path)
            
            # Return the URL to the file
            # In a real app, this would be a full URL
            # For local dev, we'll serve it via a route
            return jsonify({
                'message': 'Upload successful',
                'url': f"/api/uploads/{unique_filename}",
                'filename': unique_filename
            }), 201
            
        return jsonify({'error': 'File type not allowed'}), 400
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@upload_bp.route('/<filename>', methods=['GET'])
def get_upload(filename):
    """Serve uploaded files"""
    upload_path = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    return send_from_directory(upload_path, filename)
