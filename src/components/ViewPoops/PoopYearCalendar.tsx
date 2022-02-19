import { useToast } from '@chakra-ui/react';
import { default as React, useEffect, useState } from 'react';
import { Poop } from '../../schemas/poop.schema';
import { User } from '../../schemas/user.schema';
import { getPoops } from '../../services/poop.service';
import Calendar from '../Calendar/Calendar';

export default function PoopYearCalendar({ user }: { user: User }) {
  const [poops, setPoops] = useState([] as Poop[]);
  const toast = useToast();

  useEffect(() => {
    getPoops(user._id)
      .then((data) => setPoops(data === null ? [] : data))
      .catch((err) =>
        toast({
          title: 'Error',
          description:
            err instanceof Error
              ? err.message
              : 'Error while looking for users to render calendar',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      );
  }, []);

  return <Calendar poops={poops} />;
}
