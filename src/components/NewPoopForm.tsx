import { useToast } from '@chakra-ui/react';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { getUsers } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { Select, Button, Flex } from '@chakra-ui/react';
import NewPoop from '../pages/NewPoop';
import { newPoop } from '../services/poop.service';

const UserOptions = ({ users }: { users: User[] }) => (
  <>
    {users.map((u) => (
      <option key={u._id}>
        {u.username} - {`${u.firstname} ${u.lastname}`}
      </option>
    ))}
  </>
);

export function NewPoopForm() {
  const [users, setUsers] = useState([] as User[]);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    userId: '',
  });

  const toast = useToast();

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res))
      .catch((err) => {
        toast({
          title: 'Error',
          description: err instanceof Error ? err.message : null,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  const handleUserChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedId =
      e.target.options.selectedIndex > 0
        ? users[e.target.options.selectedIndex - 1]._id
        : '';
    
    setError(selectedId === '');

    setInput({
      userId: selectedId,
    });
  };

  const submitPoop = async () => {
    if (input.userId == '') {
      setError(true);
    } else {
      setError(false);
      newPoop(input.userId)
        .then((succ) =>
          toast({
            title: 'Succes',
            description: `Poop saved ${succ}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        )
        .catch((err) =>
          toast({
            title: 'Error',
            description: err instanceof Error ? err.message : null,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        );
    }
  };

  return (
    <>
      <Flex direction="row">
        <Select onChange={handleUserChange} isInvalid={error}>
          <option>Seleccione usuario...</option>
          {users.length != 0 ? <UserOptions users={users} /> : <></>}
        </Select>
        <Button ms={3} onClick={submitPoop}>
          Register Poop
        </Button>
      </Flex>
    </>
  );
}
