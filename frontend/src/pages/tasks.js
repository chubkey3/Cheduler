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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,} from '@chakra-ui/react';
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
        }})

        onClose();

        window.location.reload();
    }

    const sortbyimpt = () => {
        const temp = [...tasks];
        temp.sort(function(a, b){return (a.importance.match(/!/g) || []).length - (b.importance.match(/!/g) || []).length})
        setTasks(temp);
    }

    const sortbyalph = () => {
        const temp = [...tasks];
        temp.sort(function(a, b){return a.title.localeCompare(b.title)})
        setTasks(temp);
    }

    const sortbydate = () => {
        const temp = [...tasks];
        temp.sort(function(a, b){return new Date(a.completiondate) - new Date(b.completiondate)})
        setTasks(temp);
    }

    return (
        <>
            <Navbar active='tasks'></Navbar>
            
            <Flex flexDir={'column'} alignItems={'center'} ml={[0, 180]} pb={[10, 0]}>
                <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                    <Text fontSize={'3xl'} mt={10} fontWeight={'bold'} alignSelf={'center'}>Tasks</Text>
                </Flex>
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
                            <MenuItem onClick={sortbyimpt}>Importance</MenuItem>
                            <MenuItem onClick={sortbyalph}>A-Z</MenuItem>
                            <MenuItem onClick={sortbydate}>Date</MenuItem>
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
                        <FormControl>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input type='text' onChange={(e) => {setTitle(e.target.value)}} value={title}></Input>
                            <FormHelperText>Titles must be unique</FormHelperText>
                            <FormLabel mt={5}>
                                Description
                            </FormLabel>
                            <Textarea onChange={(e) => {setDescription(e.target.value)}} value={description}></Textarea>
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
                            <FormLabel mt={5}>
-----                            <Checkbox isChecked={isDate} onChange={(e) => toggleDate(e.target.checked)}>Date?</Checkbox>
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
