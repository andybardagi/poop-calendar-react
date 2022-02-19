import React, { ChangeEventHandler, useState, FormEventHandler } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { loginUserSchema, UserLogin } from '../schemas/user.schema';
import { logInUser } from '../services/user.service';
import { useHistory } from 'react-router-dom';

export default function RegisterForm() {
  const history = useHistory();
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const initialErrorValue = {
    username: { value: false, message: '' },
    password: { value: false, message: '' },
  };

  const [errors, setErrors] = useState(initialErrorValue);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const toast = useToast();

  const submitFormData = async (user: UserLogin) => {
    try {
      await logInUser(user);
      toast({
        title: 'Logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      history.push('/');
      console.log('aquí');
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
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
    loginUserSchema
      .validate(input, { abortEarly: false })
      .then(async () => {
        await submitFormData(input);
      })
      .catch((err: ValidationError) => {
        console.log(err);
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
      <FormControl isInvalid={errors.username.value} mt={4}>
        <FormLabel htmlFor="email">Email or username</FormLabel>
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

      <Flex justifyContent="space-between" mt={4}>
        <Button variant="outline-red">Cancel</Button>
        <Button type="submit">Log in</Button>
      </Flex>
    </form>
  );
}
