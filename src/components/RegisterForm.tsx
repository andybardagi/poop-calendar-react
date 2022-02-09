import React, { ChangeEventHandler, useState, FormEventHandler } from 'react';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Flex,
    useToast
} from '@chakra-ui/react';
import { createUserSchema, UserRegister } from '../schemas/user.schema';
import { registerUser } from '../services/user.service';
import { useHistory } from 'react-router-dom';

export default function RegisterForm() {
    const history = useHistory();
    const [input, setInput] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
    });

    const initialErrorValue = {
        email: { value: false, message: '' },
        username: { value: false, message: '' },
        password: { value: false, message: '' },
        passwordConfirm: { value: false, message: '' },
    };

    const [errors, setErrors] = useState(initialErrorValue);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInput((prevValue) => ({
            ...prevValue,
            [e.target.id]: e.target.value,
        }));
    };

    const toast = useToast();

    const submitFormData = async (user: UserRegister) => {
        try {
            const response = await registerUser(user);
            console.log(response);
            toast({
                title: 'User created',
                description: `Your user ${response.username} has been created`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            history.push('/');
        } catch (err) {
            console.log(err);
            toast({
                title: 'Error creating account',
                description: err instanceof Error ? err.message : null,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    type ValidationError = {
        name: string;
        message: string;
        path: string;
        errors: string[];
        inner: ValidationError[];
        params?: object | undefined;
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        //reset error messages
        setErrors(initialErrorValue);
        createUserSchema
            .validate(input, { abortEarly: false })
            .then(async () => await submitFormData(input))
            .catch((err: ValidationError) => {
                err.inner.forEach((indivErr) => {
                    setErrors((prevValue) => ({
                        ...prevValue,
                        [indivErr.path]: {
                            value: true,
                            message: indivErr.errors.join(''),
                        },
                    }));
                });
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl isInvalid={errors.email.value}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    type="text"
                    value={input.email}
                    onChange={handleInputChange}
                />
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username.value} mt={4}>
                <FormLabel htmlFor="email">Username</FormLabel>
                <Input
                    id="username"
                    type="text"
                    value={input.username}
                    onChange={handleInputChange}
                />
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password.value} mt={4}>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input
                    id="password"
                    type="password"
                    value={input.password}
                    onChange={handleInputChange}
                />

                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.passwordConfirm.value} mt={4}>
                <FormLabel htmlFor="email">Confirm Password</FormLabel>
                <Input
                    id="passwordConfirm"
                    type="password"
                    value={input.passwordConfirm}
                    onChange={handleInputChange}
                />

                <FormErrorMessage>
                    {errors.passwordConfirm.message}
                </FormErrorMessage>
            </FormControl>

            <Flex justifyContent="space-between" mt={4}>
                <Button variant="outline-red">Cancel</Button>
                <Button type="submit">Create user</Button>
            </Flex>
        </form>
    );
}
