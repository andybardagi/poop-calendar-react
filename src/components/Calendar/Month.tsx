import { Box, Divider, EffectProps, LayoutProps, Text } from '@chakra-ui/react';
import React, { CSSProperties } from 'react';
import { quantColors, maxPoopPerDayColor } from '../../assets/colors';

type props = {
  days: Array<number>;
  monthIndex: number;
  month?: string;
} & LayoutProps &
  EffectProps;

export default function Month({ days, month, monthIndex, ...props }: props) {
  const bgColor = quantColors;

  const calculateFirstChild = (monthIndex: number) => {
    const dt = new Date();
    dt.setMonth(monthIndex);
    dt.setDate(1);
    const gap = dt.getDay() + 1;
    return gap;
  };

  const monthFirstChildGap = calculateFirstChild(monthIndex);

  const style: CSSProperties = {
    gridColumn: monthFirstChildGap,
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7,1fr)',
    gridGap: '3px',
  };

  //.date-grid button:first-child {grid-column: 6;}

  return (
    <>
      <Box
        className="calendar"
        {...props}
        p={'20px'}
        borderRadius="xl"
        bg="#fff6ed"
      >
        <Text textAlign={'center'} textColor="#444" mb={1}>
          {month}
        </Text>
        <Divider mb={2} />
        <div className="day-of-week" style={gridStyle}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <Text textAlign={'center'} key={d} color="primary.dark" mb={1}>
              {d}
            </Text>
          ))}
        </div>
        <div className="date-grid" style={{ ...style, ...gridStyle }}>
          {days.map((d, i) => (
            <Box
              mx={'auto'}
              mb={1}
              key={i}
              bg={
                d >= maxPoopPerDayColor
                  ? bgColor[maxPoopPerDayColor]
                  : bgColor[d]
              }
              boxSize={6}
              textAlign="center"
              justifyContent="center"
              gridColumn={i === 0 ? monthFirstChildGap : ''}
              fontWeight={500}
            >
              {i + 1}
            </Box>
          ))}
        </div>
      </Box>
    </>
  );
}
