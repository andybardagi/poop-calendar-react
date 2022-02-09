import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@chakra-ui/react';
import About from '../components/About';

export default function AboutPage() {
    return (
        <div>
            <Navbar />
            <Container
                maxW="container.sm"
                mx="auto"
                bg="white"
                boxShadow="sm"
                borderRadius="xl"
                py={4}
                px={8}
            >
                <About />
            </Container>
        </div>
    );
}
