import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Flex, Badge, Heading, Text, Divider, VStack, Menu, MenuButton, Button, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [activeSort, setActiveSort] = useState("");

    useEffect(() => {
        axios.get('/api/tasks', {
            headers: {
                "access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            setTasks(res.data);
        })
    }, [])

    const sortbyimpt = () => {
        const temp = [...tasks];
        temp.sort(function(a, b){return (b.importance.match(/!/g) || []).length - (a.importance.match(/!/g) || []).length})
        setTasks(temp);
        setActiveSort("impt");
    }

    const sortbyalph = () => {
        const temp = [...tasks];
        temp.sort(function(a, b){return a.title.localeCompare(b.title)})
        setTasks(temp);
        setActiveSort("alph");
    }

    const sortbydate = () => {
        const temp = [...tasks];
        temp.sort(function(a, b){
            return new Date((a.completiondate !== "") ? a.completiondate : "1970-01-01") - new Date((b.completiondate !== "") ? b.completiondate : "1970-01-01")
        
        });
        temp.reverse();
        setTasks(temp);
        setActiveSort("date");
    }
  return (
    <>
        <Flex w={'100%'} justifyContent={'center'} maxH={'40vh'} py={3}>
            <VStack overflowY={'scroll'} spacing={3}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Tasks</Text>
                    <Flex justifyContent={'right'} w={'95%'}>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                Sort
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Sort'>
                                    <MenuItem onClick={sortbyimpt} color={activeSort === 'impt' && 'red.500'}>Importance</MenuItem>
                                    <MenuItem onClick={sortbyalph} color={activeSort === 'alph' && 'red.500'}>A-Z</MenuItem>
                                    <MenuItem onClick={sortbydate} color={activeSort === 'date' && 'red.500'}>Date</MenuItem>
                                </MenuGroup>
                            </MenuList>   
                        </Menu>
                    </Flex>
                {tasks.map((task) => (
                    <Task key={task.title} data={task}></Task>
                ))}
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
