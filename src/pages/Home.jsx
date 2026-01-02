import React from 'react';
import Hero from '../components/home/Hero';
import LatestProperties from '../components/home/LatestProperties';
import ServiceCategories from '../components/home/ServiceCategories';
import PlatformStats from '../components/home/PlatformStats';
import TopCoworking from '../components/home/TopCoworking';
import FeaturedCoworking from '../components/home/FeaturedCoworking';
import TopColiving from '../components/home/TopColiving';
import FeaturedColiving from '../components/home/FeaturedColiving';
import WhatYouGet from '../components/home/WhatYouGet';
import SpaceSearch from '../components/home/SpaceSearch';
import TrustedCompanies from '../components/home/TrustedCompanies';
import ListSpace from '../components/home/ListSpace';
import MediaMentions from '../components/home/MediaMentions';
import FounderNote from '../components/home/FounderNote';

const Home = () => {
    return (
        <div>
            <Hero />
            <LatestProperties />
            <ServiceCategories />
            <PlatformStats />
            <TopCoworking />
            <FeaturedCoworking />
            <TopColiving />
            <FeaturedColiving />
            <WhatYouGet />
            <SpaceSearch />
            <TrustedCompanies />
            <ListSpace />
            <MediaMentions />
            <FounderNote />
        </div>
    );
};

export default Home;


