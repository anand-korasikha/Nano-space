"""
Routes initialization and registration
"""

from routes.auth import auth_bp
from routes.properties import properties_bp
from routes.otp import otp_bp
from routes.bookings import bookings_bp
from routes.admin import admin_bp
from routes.data_routes import data_bp

def register_routes(app):
    """Register all blueprints"""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(properties_bp, url_prefix='/api/properties')
    app.register_blueprint(otp_bp, url_prefix='/api/otp')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(data_bp, url_prefix='/api/data')
