import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Heading } from '@chakra-ui/react';
import { NewPoopForm } from '../components/NewPoopForm';

export default function NewPoop() {
  return (
    <div>
      <Navbar />
      <Container
        maxW="container.lg"
        mx="auto"
        bg="white"
        boxShadow="sm"
        borderRadius="xl"
        py={4}
        px={8}
      >
        <Heading mb={4}>New Poop</Heading>
        <NewPoopForm />
      </Container>
    </div>
  );
}
