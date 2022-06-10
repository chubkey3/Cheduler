import React, {useState, useEffect} from 'react'
import Navbar from '../components/navbar';
import axios from 'axios';
import TaskContainer from '../components/(Optional)task-container';
import {SimpleGrid, Button, Flex, Stack, Text, Tag, Input, Textarea, TagLabel, Modal, HStack,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
useDisclosure,
Radio,
RadioGroup,
Checkbox,
FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {IoIosAdd} from 'react-icons/io';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isDate, toggleDate] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("!");
    const [date, setDate] = useState("");
    const [error, setError] = useState(false);
    const [activeSort, setActiveSort] = useState("");
    const toast = useToast()

    useEffect(() => {
        axios.get('http://localhost:3001/tasks', {
            headers: {
                "access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            setTasks(res.data);
        })
    }, [])

    const add = () => {
        onOpen();
    }

    const submit = () => {    
        axios.post('http://localhost:3001/tasks', {
            title: title,
            description: description,
            importance: importance,
            completiondate: date
        }, {headers: {
            "access-token": localStorage.getItem('token')
        }}).then(function(){
            onClose();
            window.location.reload();
        })
        .catch(function(error) {
            if (error.response.status === 403){
                toast({
                    title: 'Invalid Task',
                    description: 'Task title already exists.',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                })
            }
            setError(true);
        })
    }

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
        temp.sort(function(a, b){return new Date((b !== "") ? b.completiondate : "1970-01-01") - new Date((a !== "") ? a.completiondate : "1970-01-01")});
        temp.reverse();
        setTasks(temp);
        setActiveSort("date");
    }

    return (
        <>
            <Navbar active='tasks'></Navbar>
            <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} m={0} p={0}>
                    <Text fontSize={'4xl'} mt={10} fontWeight={'bold'} alignSelf={'center'}>Tasks</Text>
            </Flex>
            <Flex flexDir={'column'} alignItems={'center'} ml={[0, 180]} pb={[10, 0]}>
                <Flex w={'100%'} justifyContent={['center', 'right']} mr={[0, 10]} my={6}>
                    <HStack >
                    <Tag onClick={add} cursor={'pointer'} colorScheme={'whatsapp'}h={'100%'}>
                        <TagLabel fontSize={'20px'}>New</TagLabel>
                        <IoIosAdd fontSize={'30px'}/>
                    </Tag>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                            Sort By
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={sortbyimpt} color={activeSort === 'impt' && 'red.500'}>Importance</MenuItem>
                            <MenuItem onClick={sortbyalph} color={activeSort === 'alph' && 'red.500'}>A-Z</MenuItem>
                            <MenuItem onClick={sortbydate} color={activeSort === 'date' && 'red.500'}>Date</MenuItem>
                        </MenuList>
                    </Menu>
                    </HStack>
                </Flex>
                <SimpleGrid columns={[1,2,3]} w={'90%'}>{tasks.map((task) => (
                    <TaskContainer data={task} key={task.title}></TaskContainer>
                ))}</SimpleGrid>
                
            </Flex>




            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired={true} isInvalid={error} onChange={() => {setError(false)}}>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input type='text' onChange={(e) => {setTitle(e.target.value)}} value={title}></Input>
                            {!error ? (<FormHelperText>Titles must be unique</FormHelperText>) :
                            (<FormErrorMessage>Invalid Title</FormErrorMessage>)}
                        </FormControl>
                        <FormControl>
                            <FormLabel mt={5}>
                                Description
                            </FormLabel>
                            <Textarea onChange={(e) => {setDescription(e.target.value)}} value={description}></Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel mt={5}>
                                Importance
                                <RadioGroup onChange={setImportance} value={importance}>
                                    <Stack direction={'row'} spacing={4}>
                                        <Radio value='!'>!</Radio>
                                        <Radio value='!!'>!!</Radio>
                                        <Radio value='!!!'>!!!</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormLabel>
                        </FormControl>
                        <FormControl>
                            <FormLabel mt={5}>
                                <Checkbox isChecked={isDate} onChange={(e) => toggleDate(e.target.checked)}>Date?</Checkbox>
                                {isDate && <Input type='date' onChange={(e) => {setDate(e.target.value)}} value={date}></Input>}
                            </FormLabel>
                            
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={'facebook'} onClick={submit}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
