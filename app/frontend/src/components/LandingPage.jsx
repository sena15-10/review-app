import React,{ useEffect } from 'react';
import HeroSection from './landingPage/HeroSection';
import ReviewSection from './landingPage/ReviewSection';
import CommentSection from './landingPage/CommentSection';
import CommunitySection from './landingPage/communitySection';
import BenefitSection from './landingPage/BenefitSection';
const LandingPage = () => {
    return (
        <div className='landingPage'>
            <HeroSection />
            <div className='landingPageDetail'>
                <ReviewSection />
                <CommentSection />
                <CommunitySection />
                <BenefitSection />
            </div>
        </div>
    );
};

export default LandingPage