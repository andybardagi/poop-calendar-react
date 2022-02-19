import React from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import { Text, HStack } from '@chakra-ui/react';
export default function About() {
  const descriptionLines = [
    'Poop Track is a web application built using React for its client and Go for the backend.',
    'Through its intuitive interface you can keep track of how many times you shit a day. In a near future, you will have the possibility to export the data to a calendar and share it with your friends.',
  ];

  const descriptionRender = descriptionLines.map((d, i) => (
    <Text key={i} mt={2}>
      {' '}
      {d.toString()}{' '}
    </Text>
  ));

  return (
    <div>
      <HStack direction="row" spacing={3}>
        <InfoIcon boxSize={6} />
        <Text fontSize="x-large"> About Poop Tracker App</Text>
      </HStack>
      <Text>{descriptionRender}</Text>
    </div>
  );
}
