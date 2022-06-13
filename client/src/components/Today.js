import { Flex, Heading, Text, VStack, Badge, Divider } from '@chakra-ui/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function Today() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks/day', {
            params: {
                date: new Date().getDate()-1, //-1 
                month: new Date().getMonth()+1
            },
            headers: {
                "access-token": localStorage.getItem('token')
            }})
          .then(res => {
            setData(res.data);
          })
    }, [])

    return (
        <>
            <Flex w={'100%'} justifyContent={'center'} overflowY={'scroll'} maxH={'40vh'} py={3}>  
                <VStack>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Today</Text>
                    {(data.length > 0) ? (data.map((task) => (
                        <Task key={task.title} data={task}></Task>
                    ))) : (<Text fontSize={'lg'}>No Tasks Today.</Text>)}
                </VStack>
            </Flex>
        </>
    )
}

function Task({data}){

    return (
        <Flex w={'80%'} flexDir={'column'} border={'1px'} borderColor={'gray.300'} borderRadius={'lg'} p={5}>
            <Flex alignItems={'center'}>
                <Badge colorScheme={'red'} mr={2} fontSize={'l'} >{data.importance}</Badge>
                <Heading fontSize={'2xl'}>{data.title}</Heading>
            </Flex>
            <Divider mt={3} mb={5}/>
            <Text noOfLines={[1, 2]}>{data.description}</Text>
        </Flex>
    )
}