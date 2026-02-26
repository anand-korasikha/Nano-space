"""
Nano Space Backend - Main Application Entry Point
Flask REST API for property management, authentication, and services
"""

from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from extensions import db, jwt, mail
from routes import register_routes
import logging

def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Register blueprints
    register_routes(app)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        import traceback
        return jsonify({'error': 'Internal server error', 'message': str(error), 'trace': traceback.format_exc()}), 500
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Welcome to Nano Space API',
            'health_check': '/health',
            'api_version': '1.0.0'
        })

    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'service': 'Nano Space API',
            'version': '1.0.0'
        })
    
    # Create database tables
    with app.app_context():
        print(f"Using database: {app.config['SQLALCHEMY_DATABASE_URI']}")
        db.create_all()
    
    return app

from a2wsgi import WSGIMiddleware

app = create_app()
# ASGI adapter for uvicorn
asgi_app = WSGIMiddleware(app)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
