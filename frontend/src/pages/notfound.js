import { Flex, Image, Text, Link } from '@chakra-ui/react';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

function NotFound(){
    return (
        <Flex w={'100%'} justifyContent={'center'} flexDir={'column'} alignItems={'center'} textAlign={'center'}>
            <Flex w={'90%'} justifyContent={'center'} flexDir={'column'} alignItems={'center'} textAlign={'center'}>
                <Text fontSize={'3xl'} fontWeight={'bold'} mb={8}>I Can't Find What You Are Looking For 🙈</Text>
                <Image boxSize={'md'} src={require("../assets/chubkeyicon.jpeg")} borderRadius={'lg'}></Image>
                <Text mt={5}>Let's go to the <Link as={RouterLink} color={'blue.400'} to="/dashboard">dashboard!</Link></Text>
            </Flex>
        </Flex>
    )
}

export default NotFound;