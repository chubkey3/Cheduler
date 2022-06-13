import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Flex, Box, FormControl, FormLabel, Input, FormHelperText, Text, Alert, AlertIcon, AlertDescription, Link, InputGroup, InputLeftElement} from '@chakra-ui/react';
import {BsFillPersonFill} from 'react-icons/bs';
import {RiKeyFill} from 'react-icons/ri';
import {HiOutlineMail} from 'react-icons/hi';

function Login(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidusername, setInvalidUsername] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')){
            navigate('/dashboard');
        }

    }, [navigate])

    const handleSignUp = async (e) => {
        e.preventDefault()

        axios.post('/api/signup', {username: username, password: password})
            .then(res => {
                axios.post('/api/login', {username: username, password: password})
                    .then(res => {
                        navigate('/dashboard')
                        localStorage.setItem('token', res.data);
                        setInvalidUsername(false);
                    })
            })
            .catch(function(error) {
                if (error.response){
                    setInvalidUsername(true);
                }
            })

        setUsername("");
        setPassword("");
    }

    return(
        <>
        <Box w={'100vw'} h={'100vh'} position={'absolute'} zIndex={-1} bgColor={'blue.100'}></Box>
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100vw'} h={'100vh'}>
            <Text fontSize={'3xl'} fontWeight={'bold'} mb={10}>Sign Up</Text>
            <Box w={['80%', '50%']} p={6} borderRadius={'xl'} maxW={'500px'} boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} bgColor={'white'}>
                <form onSubmit={handleSignUp}>
                <FormControl>
                    <FormLabel htmlFor={'email'}>Email</FormLabel>
                    <InputGroup>
                        <InputLeftElement><HiOutlineMail/></InputLeftElement>
                        <Input type={'email'} mb={5} value={email} onChange={(e) => {setEmail(e.target.value)}} borderColor={'gray.400'}/>
                    </InputGroup>
                    <FormLabel htmlFor={'username'}>Username</FormLabel>
                    <InputGroup>
                        <InputLeftElement><BsFillPersonFill/></InputLeftElement>
                        <Input type={'text'} mb={5} value={username} onChange={(e) => {setUsername(e.target.value)}} borderColor={'gray.400'}/>
                    </InputGroup>
                    <FormLabel htmlFor={'password'}>Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement><RiKeyFill/></InputLeftElement>
                        <Input type={'password'} mb={10} value={password} onChange={(e) => {setPassword(e.target.value)}} borderColor={'gray.400'}/>
                    </InputGroup>
                    <Input type={'submit'} value={'Register'} backgroundColor={'blue.400'} color={'white'} fontWeight={'500'} _hover={{backgroundColor: "blue.500"}}/>
                    <FormHelperText mt={5}>Already have an account? <Link as={RouterLink} to="/login" color={'blue.400'}>Log in</Link></FormHelperText>
                    {invalidusername && <Alert status="error" borderRadius={'lg'} mt={5} size={'50'}><AlertIcon/><AlertDescription>Username already exists.</AlertDescription></Alert>}
                </FormControl>
                </form>
            </Box>
           
        </Flex>
        </>
    )
}

export default Login;


