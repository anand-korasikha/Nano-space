"""
Database models initialization
"""

from models.user import User
from models.property import Property
from models.otp import OTP
from models.booking import Booking
from models.enquiry import Enquiry
from models.city_data import CoworkingSpace, ColivingSpace, EventSpace, PartyHall, Hotel, PrivateTheatre
from models.content_data import HeroContent, FAQ, ServiceCategory, ServiceProvider

__all__ = [
    'User', 'Property', 'OTP', 'Booking', 'Enquiry',
    'CoworkingSpace', 'ColivingSpace', 'EventSpace', 'PartyHall', 'Hotel', 'PrivateTheatre',
    'HeroContent', 'FAQ', 'ServiceCategory', 'ServiceProvider'
]

