import React from 'react';
import Hero from '../Hero/Hero';
import BannerAd from '../BannerAdd/BannerAdd';
import Trending from '../Trending/Trending';
import TopFeatured from '../TopFeatured/TopFeatured';
import Adds from '../Adds/Adds';
import Company from '../Company/Company';
import ContractUs from '../ContractUs/ContractUs';


const Home = () => {
    return (
        <div>
         
         <BannerAd></BannerAd>
            <Hero></Hero>
            <Company></Company>
            <Trending title={"Trending Products"}></Trending>
            <Adds></Adds>
            <TopFeatured title={"Featured Products"}></TopFeatured>
            <ContractUs></ContractUs>
            
            
    
        </div>
    );
};

export default Home;