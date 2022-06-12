import React, {useState} from 'react'
import {Box, Button, Modal, Badge, useDisclosure, Flex, Text, Textarea, Center, Heading, Divider, Input, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, RadioGroup, Radio, Editable, EditablePreview, EditableInput} from '@chakra-ui/react'
import {FaTrashAlt} from 'react-icons/fa';
import axios from 'axios';

export default function TaskContainer(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
    const [value, setValue] = useState(props.data.description);
    const [title, setTitle] = useState(props.data.title);
    const [date, setDate] = useState( (props.data.completiondate !== "") ? ((new Date(props.data.completiondate).getFullYear()) + '-' + ('0' + (new Date(props.data.completiondate).getMonth()+1)).slice(-2) + '-' + ('0' + (new Date(props.data.completiondate).getDate()+1)).slice(-2)) : "");
    const [importance, setImportance] = useState(props.data.importance);

    const del = () => {
        axios.delete('/tasks', {headers: {"access-token": localStorage.getItem('token')}, data: {title: props.data.title}})
            
        onClose2();

        window.location.reload();
    }

    const save = () => {
        onClose();
        axios.patch('/tasks', {oldtitle: props.data.title, newtitle: title, description: value, importance: importance, completiondate: date}, {headers: {"access-token": localStorage.getItem('token')}})
    }

    return (
        <>
        <Box borderWidth={'1px'} borderRadius={'lg'} p={0} m={3} maxW={'400px'}>
            <Box as={'button'} onClick={onOpen} width={'100%'} h={'100%'} p={5}>
                <Center>
                    <Badge colorScheme={'red'} mr={2} fontSize={'l'}>{importance}</Badge>
                    <Heading fontSize={['2xl', 'xl', '2xl']}>
                        {title}
                    </Heading>
                </Center>

                <Box mt={'6'}>
                    <Text fontSize='sm' noOfLines={2}>
                        {value}
                    </Text>
                </Box>

                <Divider mt={'6'}/>

                <Flex>
                    {props.data.completiondate && <Text fontSize={'xs'} mt={1}>{date}</Text>}
                </Flex>

            </Box>

            
        
        </Box>
        <Modal isOpen={isOpen} onClose={save} size={'full'} motionPreset={'scale'}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                <Flex justifyContent={'left'}>
                    <RadioGroup onChange={setImportance} value={importance}>
                        <Radio colorScheme={'facebook'} value={'!'} m={3} size={'lg'}>!</Radio>
                        <Radio colorScheme={'facebook'} value={'!!'} m={3} size={'lg'}>!!</Radio>
                        <Radio colorScheme={'facebook'} value={'!!!'} m={3} size={'lg'}>!!!</Radio>
                    </RadioGroup>
                </Flex>
                <Center>
                    <Heading>
                        <Flex justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                            <Editable value={title} onChange={setTitle}>
                                <EditablePreview/>
                                <EditableInput/>
                            </Editable>
                        </Flex>
                    </Heading>
                </Center>
        
                </ModalHeader>
                <ModalCloseButton/>
                <Divider/>
                <ModalBody>
                    <Flex justifyContent={'center'}>
                        <Textarea mt={5} h={'70vh'} onChange={(e) => {setValue(e.target.value)}} maxW={'1000px'}>
                            {value}
                        </Textarea>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Input type='date' value={date} onChange={(e) => {setDate(e.target.value)}}>
                        
                    </Input>
                    <Flex as='button' borderRadius={'full'} onClick={onOpen2} ml={10} mr={3}>
                        <FaTrashAlt fontSize={'28px'}/>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <AlertDialog isOpen={isOpen2} onClose={onClose2}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Delete Task
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete this task?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose2}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={del}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>
    )
}