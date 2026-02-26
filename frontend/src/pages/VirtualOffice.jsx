import React from 'react';
import Hero from '../components/home/Hero';
import VirtualOfficeServices from '../components/virtualoffice/VirtualOfficeServices';
import TopVirtualOfficeCities from '../components/virtualoffice/TopVirtualOfficeCities';
import VirtualOfficeBenefits from '../components/virtualoffice/VirtualOfficeBenefits';
import VirtualOfficeServicesGrid from '../components/virtualoffice/VirtualOfficeServicesGrid';
import VirtualOfficesMap from '../components/virtualoffice/VirtualOfficesMap';
import VirtualOfficeContactForm from '../components/virtualoffice/VirtualOfficeContactForm';
import TrustedCompanies from '../components/home/TrustedCompanies';
import FounderNote from '../components/home/FounderNote';
import CoworkingFAQ from '../components/coworking/CoworkingFAQ';


const VirtualOffice = () => {
    return (
        <>
            <Hero pageType="virtualoffice" />
            <VirtualOfficeServices />
            <TopVirtualOfficeCities />
            <VirtualOfficeBenefits />
            <VirtualOfficeServicesGrid />
            <VirtualOfficesMap />
            <VirtualOfficeContactForm />
            <TrustedCompanies />
            <FounderNote />
            <CoworkingFAQ pageType="virtualoffice" />

        </>
    );
};

export default VirtualOffice;
