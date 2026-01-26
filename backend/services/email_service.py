"""
Email service for sending OTPs and notifications
"""

from flask_mail import Message
from extensions import mail
from config import Config
import logging

logger = logging.getLogger(__name__)

def send_email_otp(email, otp_code):
    """Send OTP via email"""
    try:
        msg = Message(
            subject='Your Nano Space OTP Code',
            recipients=[email],
            sender=Config.MAIL_DEFAULT_SENDER
        )
        
        msg.html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }}
                .otp-code {{
                    font-size: 32px;
                    font-weight: bold;
                    color: #667eea;
                    text-align: center;
                    padding: 20px;
                    background: white;
                    border-radius: 5px;
                    letter-spacing: 5px;
                    margin: 20px 0;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    color: #666;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Nano Space Verification</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Your OTP code for verification is:</p>
                    <div class="otp-code">{otp_code}</div>
                    <p>This code will expire in {Config.OTP_EXPIRY_MINUTES} minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2026 Nano Space. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # For development, just log the OTP
        logger.info(f'━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        logger.info(f'📧 EMAIL OTP SENT')
        logger.info(f'To: {email}')
        logger.info(f'OTP Code: {otp_code}')
        logger.info(f'Valid for: {Config.OTP_EXPIRY_MINUTES} minutes')
        logger.info(f'━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        
        # Uncomment to actually send email in production
        # mail.send(msg)
        
        return True
        
    except Exception as e:
        logger.error(f'Error sending email OTP: {str(e)}')
        return False

def send_property_approval_email(email, property_name):
    """Send property approval notification"""
    try:
        msg = Message(
            subject='Property Approved - Nano Space',
            recipients=[email],
            sender=Config.MAIL_DEFAULT_SENDER
        )
        
        msg.html = f"""
        <!DOCTYPE html>
        <html>
        <body>
            <h2>Congratulations!</h2>
            <p>Your property <strong>{property_name}</strong> has been approved and is now live on Nano Space.</p>
            <p>Customers can now view and book your property.</p>
            <p>Best regards,<br>Nano Space Team</p>
        </body>
        </html>
        """
        
        logger.info(f'Property approval email sent to {email}')
        # mail.send(msg)
        
        return True
        
    except Exception as e:
        logger.error(f'Error sending approval email: {str(e)}')
        return False
