import { useToast } from '@chakra-ui/react';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { getUsers } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { Select, Button, Flex } from '@chakra-ui/react';
import NewPoop from '../pages/NewPoop';
import { newPoop } from '../services/reviews.service';

export function NewPoopForm() {
    const EXAMPLE_USERS = [
        {
            id: '6203296173e305527b35e2fd',
            username: 'ginomassei',
            firstname: 'Gino',
            lastname: 'Massei',
        },
        {
            id: '62032d79087d4e896eafd0b4',
            username: 'abardagi',
            firstname: 'Andy',
            lastname: 'Bardagi',
        },
        {
            id: '6203b6072141bd3863d64f69',
            username: 'lorensala',
            firstname: 'Lorenzo',
            lastname: 'Sala',
        },
        {
            id: '6203b6152141bd3863d64f6a',
            username: 'ramisomavilla',
            firstname: 'Ramiro',
            lastname: 'Somavilla',
        },
        {
            id: '6203b6292141bd3863d64f6b',
            username: 'juan_tamosaitis',
            firstname: 'Juan',
            lastname: 'Tamosaitis',
        },
        {
            id: '6203b6372141bd3863d64f6c',
            username: 'lucaslopez',
            firstname: 'Lucas',
            lastname: 'Lopez',
        },
        {
            id: '6203f1619f864a3f6ef789dd',
            username: 'usuariodeprueba',
            firstname: 'Usuario',
            lastname: 'Prueba',
        },
    ];

    const [users, setUsers] = useState(EXAMPLE_USERS);
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

    const changeSelected: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const nwValue = event.target.value;
        //console.log(event.target.innerHTML);
        setInput((prevValue) => ({ ...prevValue, [event.target.id]: nwValue }));
    };

    const submitPoop = async () => {
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
    };

    const UserOptions = EXAMPLE_USERS.map((user) => (
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    ));

    return (
        <>
            <Flex direction="row">
                <Select onChange={changeSelected}>
                    { users.length != 0 ? UserOptions : <></>}
                </Select>
                <Button ms={3} onClick={submitPoop}>
                    Register Poop
                </Button>
            </Flex>
        </>
    );
}
