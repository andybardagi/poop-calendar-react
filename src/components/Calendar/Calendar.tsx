import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { nullCalendar } from '../../helpers/days';
import { Poop } from '../../schemas/poop.schema';
import Month from './Month';

type CalendarProps = {
  poops: Poop[];
};

export default function Calendar({ poops }: CalendarProps) {
  const calendar = nullCalendar();

  const filledCalendar = [...calendar];
  poops.forEach(({ timestamp }) => {
    const poopDate = new Date(timestamp);
    filledCalendar[poopDate.getMonth()].days[poopDate.getDate() - 1] += 1;
  });

  return (
    <Flex
      maxW="100%"
      direction={'row'}
      flexWrap="wrap"
      justifyContent="space-around"
    >
      {filledCalendar.map((m, i) => (
        <Box
          key={i}
          w={'33%'}
          minW="270px"
          p={'10px'}
          display="grid"
          placeItems={'center'}
        >
          <Month
            maxW="250px"
            height={'100%'}
            days={m.days}
            month={m.monthString}
            boxShadow="md"
            monthIndex={i}
          />
        </Box>
      ))}
    </Flex>
  );
}
