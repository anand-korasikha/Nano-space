// City Building Icon
export const CityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
);

// Landmark Icon
export const LandmarkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 9L12 15L22 9L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M2 15L12 21L22 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M2 12L12 18L22 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
);

// Metro/Tech City Icon
export const MetroIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="2"
            stroke="currentColor"
            strokeWidth="1.5" />
        <path d="M7 10H17M7 14H17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
        <circle cx="7" cy="18" r="1" fill="currentColor" />
        <circle cx="17" cy="18" r="1" fill="currentColor" />
        <path d="M12 6V3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
    </svg>
);

// Beach/Coastal City Icon
export const BeachIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C12 3 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 3 12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M12 14V21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
        <path d="M4 21H20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
        <path d="M8 17C8 17 6 18 4 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
        <path d="M16 17C16 17 18 18 20 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
    </svg>
);

// Heritage/Historical City Icon
export const HeritageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 7V12C4 16.42 7.58 20.42 12 21C16.42 20.42 20 16.42 20 12V7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M12 8V14M9 11H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
    </svg>
);

// Modern Skyscraper Icon
export const SkyscraperIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="12" height="18" rx="1"
            stroke="currentColor"
            strokeWidth="1.5" />
        <path d="M9 7H15M9 11H15M9 15H15M9 19H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
        <path d="M12 3V1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" />
        <circle cx="12" cy="1" r="0.5" fill="currentColor" />
    </svg>
);

// Industrial/Business Hub Icon
export const BusinessHubIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M9 22V12H15V22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
);

// Port/Coastal Business Icon
export const PortIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
);

// Map of city icons for each city
export const cityIcons = {
    'Bangalore': <SkyscraperIcon />,
    'Mumbai': <MetroIcon />,
    'Delhi': <HeritageIcon />,
    'Hyderabad': <BusinessHubIcon />,
    'Chennai': <PortIcon />,
    'Pune': <CityIcon />,
    'Kolkata': <HeritageIcon />,
    'Ahmedabad': <BusinessHubIcon />,
    'Jaipur': <HeritageIcon />,
    'Surat': <BusinessHubIcon />,
    'Lucknow': <HeritageIcon />,
    'Indore': <CityIcon />,
    'Chandigarh': <CityIcon />,
    'Kochi': <BeachIcon />,
    'Coimbatore': <CityIcon />,
    'Noida': <SkyscraperIcon />,
    'Gurgaon': <SkyscraperIcon />,
    'Goa': <BeachIcon />
};

// Helper function to get icon for a city
export const getCityIcon = (cityName) => {
    return cityIcons[cityName] || <CityIcon />;
};
