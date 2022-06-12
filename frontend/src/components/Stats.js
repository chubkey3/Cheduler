import React, {useState, useEffect} from 'react'
import {FaTasks} from 'react-icons/fa';
import {FiAlertCircle} from 'react-icons/fi';
import {IoTodayOutline} from 'react-icons/io5';
import {BsCalendarWeek} from 'react-icons/bs';
import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';

export default function Stats() {
    const [total, setTotal] = useState(0);
    const [impt, setImpt] = useState(0);
    const [week, setWeek] = useState(0);
    const [today, setToday] = useState(0);
    
    useEffect(() => {
        axios.get('/tasks', {
            headers: {
                "access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            count(res.data);
        })
    }, [])

    const count = (data) => {
        let now = new Date();
        for (var t of data){

            setTotal(total => total+1);
            let date = new Date(t.completiondate);

            if (now.getDate() === date.getDate()+1 && now.getMonth() === date.getMonth()){
                setToday(today => today + 1);
            }

            if (t.importance === '!!!'){
                setImpt(impt => impt+1);
            }

            if ((date.getDate()+1 - now.getDate()) <= 7){
                setWeek(week => week+1);
            }
        }
    }

    return (
        <>
            <SimpleGrid columns={[2, 4]} spacing={1} maxW={'800px'} mx={5} px={5} py={8} bgColor={'white'} borderRadius={'lg'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}>
                <Fancylabel color={'red.300'} label='Total Tasks' value={total}><FaTasks fontSize={'28'}/></Fancylabel>
                <Fancylabel color={'blue.300'} label='!!! Tasks' value={impt}><FiAlertCircle fontSize={'28'}/></Fancylabel>
                <Fancylabel color={'green.300'} label='Tasks This Week' value={week}><BsCalendarWeek fontSize={'28'}/></Fancylabel>
                <Fancylabel color={'yellow.300'} label='Tasks Today' value={today}><IoTodayOutline fontSize={'28'}/></Fancylabel>
            </SimpleGrid>
        </>
    )
}

function Fancylabel({color, label, value, children}){

    return (
        <>
            <Flex size='lg' bgColor={color} borderRadius='xl' p={3} flexDir={'row'} justifyContent={'space-around'} alignItems={'center'} textAlign={'center'} _hover={{transform: "scale(1.1)"}} transition={'all 0.1s'}>
                {children}
                <Flex flexDir={'column'} maxW={'65%'}>
                    <Heading>{value}</Heading>
                    <Text fontSize={'sm'} noOfLines={1}>{label}</Text>
                </Flex>
            </Flex>
        </>
    )
}
