import { Container, Flex, Text, Image, Button, Link } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import poopEmoji from '../images/logo1200.png';
import { isLogged } from '../services/user.service';
export default function HomeMain() {
    return (
        <Flex direction="column" alignItems="center">
            <Text fontSize="4xl" fontWeight={800}>
                Welcome to your Poop Tracker App
            </Text>
            <Image src={poopEmoji} w={400} m={10}></Image>
            <Link href="/poops">
                <Button>
                    {isLogged() ? 'New poops' : 'Log In'}
                    <ArrowForwardIcon marginStart={2} />
                </Button>
            </Link>
        </Flex>
    );
}
