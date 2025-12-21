import React from 'react';
import Hero from '../components/home/Hero';
import ColivingFeatures from '../components/coliving/ColivingFeatures';
import TopColivingCities from '../components/coliving/TopColivingCities';
import ColivingBenefits from '../components/coliving/ColivingBenefits';
import TopSpaces from '../components/coworking/TopSpaces';
import ColivingPromo from '../components/coliving/ColivingPromo';
import PremiumColiving from '../components/coliving/PremiumColiving';
import CoworkingPartners from '../components/coworking/CoworkingPartners';
import ListPropertyBanner from '../components/coliving/ListPropertyBanner';
import FounderNote from '../components/home/FounderNote';
import CoworkingFAQ from '../components/coworking/CoworkingFAQ';

const Coliving = () => {
    return (
        <>
            <Hero pageType="coliving" />
            <ColivingFeatures />
            <TopColivingCities />
            <ColivingBenefits />
            <TopSpaces city="hyderabad" />
            <TopSpaces city="bangalore" reverse={true} />
            <ColivingPromo />
            <TopSpaces city="noida" />
            <TopSpaces city="pune" reverse={true} />
            <TopSpaces city="ahmedabad" />
            <PremiumColiving />
            <CoworkingPartners />
            <ListPropertyBanner />
            <FounderNote />
            <CoworkingFAQ pageType="coliving" />
        </>
    );
};

export default Coliving;
