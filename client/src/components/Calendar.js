import React, { useEffect, useState } from 'react'
import {Link as RouterLink} from 'react-router-dom';
import Calendar from 'react-calendar';
import { Badge, Heading, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, useDisclosure, Divider, Box, VStack, Link } from '@chakra-ui/react';
import axios from 'axios';

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState([]);
    
  useEffect(() => {
    axios.get('/tasks/days', {
      headers: {
          "access-token": localStorage.getItem('token')
      }})
    .then(res => {
      setDates(res.data);
    })
  }, []);

  const fetch = (e) => {
    axios.get('/tasks/day', {params: {date: e.getDate()-1, month: e.getMonth()+1}, headers: {
      "access-token": localStorage.getItem('token')
    }})
    .then(res => {
      setData(res.data);
    })

    setDate(e);
    onOpen();
  }

  const setClass = (d) => {
    const highlight = dates.find((x) => {
      return (
        d.getMonth() === new Date(x).getMonth() &&
        d.getDate() === new Date(x).getDate()+1
      )
    })
    
    return highlight ? 'highlight' : "";
  }

  return (
    <>
        <Calendar onChange={fetch} value={date} tileClassName={({ date }) => setClass(date)} onClickDay={fetch}/>

        <Modal isOpen={isOpen} onClose={onClose} size={'lg'} motionPreset={'scale'} scrollBehavior={'inside'} isCentered>
            <ModalContent>
            <ModalHeader><Center>{date.toDateString()}</Center></ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <VStack spacing={12}>
                {(data.length > 0) ? (data.map((task) => (
                <Flex key={task.title} w={'100%'} flexDir={'column'}>
                    <Flex alignItems={'center'}>
                    <Badge colorScheme={'red'} mr={2} fontSize={'l'} >{task.importance}</Badge>
                    <Heading fontSize={'2xl'}>{task.title}</Heading>
                    </Flex>
                    <Divider mt={3} mb={5}/>
                    <Text>{task.description}</Text>
                    
                </Flex>
                ))) : <Box>
                <VStack spacing={8}>
                    <Text>You have no tasks on this day.</Text>
                    <Text>Click <Link as={RouterLink} to="/tasks" color={'blue.400'}>here</Link> to add a task</Text>
                </VStack>
                </Box>}
                </VStack>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </ModalContent>

        </Modal>
    </>
  )
}
