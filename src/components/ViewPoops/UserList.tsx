import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Container, Text, useToast, Flex, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../schemas/user.schema';
import { getUsers } from '../../services/user.service';
import PoopYearCalendar from './PoopYearCalendar';

function ToggableUser({ user }: { user: User }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Flex
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text fontSize="xl">{`${user.firstname} ${user.lastname} - ${user.username}`}</Text>
        {!isOpen ? (
          <ChevronDownIcon boxSize={8} onClick={() => setOpen(!isOpen)} />
        ) : (
          <SmallCloseIcon boxSize={8} onClick={() => setOpen(!isOpen)} />
        )}
      </Flex>

      <Box display={!isOpen ? 'none' : ''}>
        <PoopYearCalendar user={user} />
      </Box>
    </>
  );
}

export default function UserList() {
  const [users, setUsers] = useState([] as User[]);
  const toast = useToast();

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
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

  return (
    <div>
      {users != [] ? (
        users.map((u) => (
          <Container
            key={u._id}
            maxW="container.lg"
            mx="auto"
            mb={[3, 4, 6]}
            bg="white"
            boxShadow="sm"
            borderRadius={[0, 0, 0, 'xl']}
            py={4}
            px={[3, 4, 8]}
          >
            <ToggableUser user={u} />
          </Container>
        ))
      ) : (
        <>A</>
      )}
    </div>
  );
}
