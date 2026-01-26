"""
SMS service for sending OTPs via Twilio or similar
"""

from config import Config
import logging

logger = logging.getLogger(__name__)

def send_sms_otp(phone, otp_code):
    """Send OTP via SMS"""
    try:
        # For development, just log the OTP
        logger.info(f'━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        logger.info(f'📱 SMS OTP SENT')
        logger.info(f'To: {phone}')
        logger.info(f'OTP Code: {otp_code}')
        logger.info(f'Valid for: {Config.OTP_EXPIRY_MINUTES} minutes')
        logger.info(f'━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        
        # Uncomment and configure for production with Twilio
        """
        from twilio.rest import Client
        
        client = Client(Config.SMS_ACCOUNT_SID, Config.SMS_AUTH_TOKEN)
        
        message = client.messages.create(
            body=f'Your Nano Space OTP code is: {otp_code}. Valid for {Config.OTP_EXPIRY_MINUTES} minutes.',
            from_=Config.SMS_FROM_NUMBER,
            to=phone
        )
        
        logger.info(f'SMS sent successfully. SID: {message.sid}')
        """
        
        return True
        
    except Exception as e:
        logger.error(f'Error sending SMS OTP: {str(e)}')
        return False
