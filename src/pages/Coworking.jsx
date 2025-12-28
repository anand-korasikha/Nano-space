import React from 'react';
import Hero from '../components/home/Hero';
import CoworkingFeatures from '../components/coworking/CoworkingFeatures';
import TopCoworkingCities from '../components/coworking/TopCoworkingCities';
import FindOfficeSpace from '../components/coworking/FindOfficeSpace';
import TopSpaces from '../components/coworking/TopSpaces';
import PerfectCoworkingSpace from '../components/coworking/PerfectCoworkingSpace';
import CoworkingPartners from '../components/coworking/CoworkingPartners';
import CoworkingContactForm from '../components/coworking/CoworkingContactForm';
import TrustedCompanies from '../components/home/TrustedCompanies';
import FounderNote from '../components/home/FounderNote';
import CoworkingFAQ from '../components/coworking/CoworkingFAQ';
import CoworkingFooterBanner from '../components/coworking/CoworkingFooterBanner';


const Coworking = () => {
    return (
        <>
            <Hero pageType="coworking" />
            <CoworkingFeatures />
            <TopCoworkingCities />
            <FindOfficeSpace />
            <TopSpaces city="hyderabad" />
            <TopSpaces city="bangalore" reverse={true} />
            <TopSpaces city="noida" />
            <PerfectCoworkingSpace />
            <TopSpaces city="pune" reverse={true} />
            <TopSpaces city="ahmedabad" />
            <TopSpaces city="delhi" reverse={true} />
            <CoworkingPartners />
            <CoworkingContactForm />
            <TrustedCompanies />
            <FounderNote />
            <CoworkingFAQ />
            <CoworkingFooterBanner />

        </>
    );
};

export default Coworking;
