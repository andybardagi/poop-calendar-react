import React from 'react';
import NavBar from '../components/Navbar';
import HomeMain from '../components/HomeMain';
import MainHolder from '../layouts/MainHolder';

export default function Home() {
    return (
        <div>
            <MainHolder>
                <HomeMain />
            </MainHolder>
        </div>
    );
}
