// City icon mapping - maps city names to their SVG file paths
export const cityIconMap = {
    'Bangalore': '/svg/Bangalore (1).svg',
    'Mumbai': '/svg/Mumbai.svg',
    'Delhi': '/svg/Delhi 1.svg',
    'Hyderabad': '/svg/hyderabad.svg',
    'Chennai': '/svg/chennai.svg', // Add if exists
    'Pune': '/svg/Pune.svg',
    'Kolkata': '/svg/kolkata.svg',
    'Ahmedabad': '/svg/ahmadabad.svg',
    'Jaipur': '/svg/jaipur.svg',
    'Surat': '/svg/surat.svg', // Add if exists
    'Lucknow': '/svg/lucknow.svg', // Add if exists
    'Indore': '/svg/indore.svg',
    'Chandigarh': '/svg/chandigarh.svg',
    'Kochi': '/svg/kochi.svg',
    'Coimbatore': '/svg/coimbatore.svg',
    'Noida': '/svg/noida.svg',
    'Gurgaon': '/svg/Gurugram.svg',
    'Goa': '/svg/goa.svg',
    'Bhubaneswar': '/svg/bhubaneswar.svg'
};

// Helper function to get icon path for a city
export const getCityIconPath = (cityName) => {
    return cityIconMap[cityName] || '/svg/default-city.svg';
};
