import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';

import Calender from '../components/Calendar';
import '../styles/Calendar2.css';
import Today from '../components/Today';
import {MdToday} from 'react-icons/md';
import Tasks from '../components/Tasks';
import Stats from '../components/Stats';

function Dashboard(){
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('token')){
            navigate('/login');
        } 
    }, [navigate])
    //put notes below calendar and make stats smaller
    return (
        <>
            <Navbar active='dashboard'></Navbar>
            <Flex w={'100%'} flexDir={'column'} bgColor={'white'} py={[0, 3]}>
                <Flex w={'100%'} justifyContent={'center'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Dashboard</Text>
                </Flex>
                <Flex position={['relative', 'relative', 'relative', 'absolute']} ml={[0, 0, 0, 190]} justifyContent={'center'} alignItems={'center'} px={5} py={2}>
                    <MdToday fontSize={'26px'}/>
                    <Text fontSize={'xl'}>{(new Date()).toDateString()}</Text>
                </Flex>
            </Flex>
            <Flex ml={[0, 180]}>
                <SimpleGrid w={['100%', '99%']} columns={[1,2]} spacing={['3%', 5]} mt={5}>
                    <Flex justifyContent='center' flexDir={'column'}>
                        <Stats/>
                    </Flex>
                    <Flex bgColor={'white'} borderRadius={'lg'} mx={[5, 0]} boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}>
                        <Today/>
                    </Flex>
                    <Flex justifyContent={'center'}>
                        <Calender/>
                    </Flex>
                    <Flex bgColor={'white'} borderRadius={'lg'} mx={[5, 0]} boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}>
                        <Tasks/>
                    </Flex>
                </SimpleGrid>
            </Flex>
            
        </>
    )
}

export default Dashboard;