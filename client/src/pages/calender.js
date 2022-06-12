import React from 'react'
import Navbar from '../components/Navbar';
import {Flex, Text} from '@chakra-ui/react';
import '../styles/Calendar.css';
import Calendar from '../components/Calendar';

export default function Calender() {

  return (
    <>
        <Navbar active={'calender'}/>
        <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} m={0} p={0}>
                <Text fontSize={'4xl'} my={10} fontWeight={'bold'} alignSelf={'center'}>Calendar</Text>
        </Flex>
        <Flex flexDir={'column'} alignItems={'center'} ml={[0, 180]}>
          <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} flexDir={'column'}>
              <Calendar/>
          </Flex>
        </Flex>
    </>
  )
}