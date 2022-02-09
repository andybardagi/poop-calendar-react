import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

export default function Register(props: Props) {
    return (
        <div>
            <Navbar />

            <Container
                maxW="container.lg"
                mx="auto"
                mb={[3, 4, 8]}
                bg="white"
                boxShadow="sm"
                borderRadius={[0, 0, 0, 'xl']}
                py={4}
                px={[3, 4, 8]}
            >
                {props.children}
            </Container>
        </div>
    );
}
