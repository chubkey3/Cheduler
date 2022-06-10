import React from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Box, useMediaQuery, Flex, Link, Text, Divider} from '@chakra-ui/react';
import {AiFillHome} from 'react-icons/ai';
import {RiCalendarTodoFill} from 'react-icons/ri';
import {CgNotes} from 'react-icons/cg';
import {BsFillPersonFill} from 'react-icons/bs';
import {FiClock, FiSettings} from 'react-icons/fi';
import {IoMdLogOut} from 'react-icons/io';

function Nav(props){
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    if (props.mobile){
        return (
            <Flex position={'fixed'} left={0}  mb={1} flexDir={'column'}  h={"100%"} pr={10} style={{caretColor: "transparent"}} borderRight={'1px'} borderColor={'gray.200'} boxShadow={'rgba(100, 100, 111, 0.2) 0px 0px 8px 0px'}>
                <Text fontSize={"2xl"} fontWeight={'bold'} py={5} ml={2}>Cheduler</Text>
                <Divider color={'black'} opacity={1} mt={3} mb={6} pr={10}/>
                <Flex h={"30vh"} flexDir={'column'} justifyContent={'space-between'} alignItems={'center'}>
                    <Flex as={RouterLink} to="/dashboard" w={"100%"} alignItems={'center'}>
                        {props.active === 'dashboard' && <Box bgColor={'red.100'} w="95%" h="35px" position={'absolute'} zIndex={"-1"} ml={1} borderRadius={'full'}></Box>}
                        <Flex ml={5} mr={4} ><AiFillHome fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Dashboard</Text>
                    </Flex>
                    <Flex as={RouterLink} to="/calender" w={"100%"} alignItems={'center'}>
                        {props.active === 'calender' && <Box bgColor={'red.100'} w="95%" h="35px" position={'absolute'} zIndex={"-1"} ml={1} borderRadius={'full'}></Box>}
                        <Flex ml={5} mr={4}><RiCalendarTodoFill fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Calendar</Text>
                    </Flex>
                    <Flex as={RouterLink} to="/tasks" w={"100%"} alignItems={'center'}>
                        {props.active === 'tasks' && <Box bgColor={'red.100'} w="95%" h="35px" position={'absolute'} zIndex={"-1"} ml={1} borderRadius={'full'}></Box>}
                        <Flex ml={5} mr={4}><FiClock fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Tasks</Text>
                    </Flex>
                    <Flex as={RouterLink} to="/notes" w={"100%"} alignItems={'center'}>
                        {props.active === 'notes' && <Box bgColor={'red.100'} w="95%" h="35px" position={'absolute'} zIndex={"-1"} ml={1} borderRadius={'full'}></Box>}
                        <Flex ml={5} mr={4}><CgNotes fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Notes</Text>
                    </Flex>
                    <Flex as={RouterLink} to="/account" w={"100%"} alignItems={'center'}>
                        {props.active === 'account' && <Box bgColor={'red.100'} w="95%" h="35px" position={'absolute'} zIndex={"-1"} ml={1} borderRadius={'full'}></Box>}
                        <Flex ml={5} mr={4}><BsFillPersonFill fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Account</Text>
                    </Flex>
                </Flex>
                <Flex mt={"20vh"} position={'absolute'} bottom={5} flexDir={'column'} w={'100%'}>
                    <Divider color={'black'} opacity={1} mb={6} orientation={'horizontal'}/>
                    <Flex w={"100%"} alignItems={'center'} alignContent={'center'} textAlign={'center'} as={RouterLink} to="/settings" mb={4}>
                        <Flex ml={5} mr={3}><FiSettings fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Settings</Text>
                    </Flex>
                    <Flex w={"100%"} alignItems={'center'} alignContent={'center'} textAlign={'center'} onClick={logout} cursor={'pointer'}>
                        <Flex ml={5} mr={3}><IoMdLogOut fontSize="1.5em"/></Flex>
                        <Text fontSize={"l"}>Log Out</Text>
                    </Flex>
                </Flex>
            </Flex>
        )
    } else {
        return (
            <Flex justifyContent={'space-around'} position={'fixed'} bottom={0} w={'100%'} mb={1} bgColor={'white'} borderTop={'1px'} borderColor={'gray.200'} pt={2} boxShadow={'rgba(100, 100, 111, 0.2) 0px 0px 3px 0px'}>
                 
                    <Link as={RouterLink} to="/dashboard"><AiFillHome fontSize="2em" color={props.active === "dashboard" && "#FED7D7"}/></Link>
                
                    <Link as={RouterLink} to="/calender"><RiCalendarTodoFill fontSize="2.1em" color={props.active === "calender" && "#FED7D7"}/></Link>
                
                    <Link as={RouterLink} to="/tasks"><FiClock fontSize="2em" color={props.active === "tasks" && "#FED7D7"}/></Link>
                
                    <Link as={RouterLink} to="/notes"><CgNotes fontSize="2em" color={props.active === "notes" && "#FED7D7"}/></Link>

                    <Flex onClick={logout}><IoMdLogOut fontSize="2em"/></Flex>
        
            </Flex>
        )
    }
}

function Navbar(props){
    const [mobile] = useMediaQuery('(min-width: 400px)')
    console.log(mobile);
    return (
        
        <Nav mobile={mobile} active={props.active}></Nav>
        
    )
}

export default Navbar;