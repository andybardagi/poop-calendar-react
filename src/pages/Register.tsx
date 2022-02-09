import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@chakra-ui/react';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
    return (
        <div>
            <Navbar />
            <Container maxW="container.sm" mx="auto" bg="white" boxShadow="sm" borderRadius="xl" py={4} px={8}>
                <RegisterForm />
            </Container>
            
        </div>
    );
}
