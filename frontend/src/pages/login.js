import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Flex, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, HStack, VStack, Text, Alert, AlertIcon, AlertTitle, AlertDescription, Link, InputGroup, InputLeftElement} from '@chakra-ui/react';
import {BsFillPersonFill} from 'react-icons/bs';
import {RiKeyFill} from 'react-icons/ri';
function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidlogin, setInvalidlogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')){
            navigate('/dashboard');
        }

    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        
        axios.post('/login', {username: username, password: password})
            .then(res => {
                navigate('/dashboard')
                localStorage.setItem('token', res.data);
                setInvalidlogin(false);
            })
            .catch(function(error) {
                alert(error)
                if (error.response){
                    setInvalidlogin(true);
                }
            })

        setUsername("");
        setPassword("");
    }

    return(
        <>
        <Box w={'100vw'} h={'100vh'} position={'absolute'} zIndex={-1} bgColor={'blue.100'}></Box>
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100vw'} h={'90vh'}>
            <Text fontSize={'3xl'} fontWeight={'bold'} mb={10}>Log In</Text>
            <Box w={['80%', '50%']} p={6} borderRadius={'xl'} maxW={'500px'} boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} bgColor={'white'}>
                <form onSubmit={handleLogin}>
                <FormControl>
                    <FormLabel htmlFor={'username'}>Username</FormLabel>
                    <InputGroup>
                        <InputLeftElement><BsFillPersonFill/></InputLeftElement>
                        <Input type={'text'} mb={5} value={username} onChange={(e) => {setUsername(e.target.value)}} borderColor={'gray.400'}/>
                    </InputGroup>
                    <FormLabel htmlFor={'password'}>Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement><RiKeyFill/></InputLeftElement>
                        <Input type={'password'}  value={password} onChange={(e) => {setPassword(e.target.value)}} borderColor={'gray.400'}/>
                    </InputGroup>
                    <Flex justifyContent={'right'}>
                        <FormHelperText mb={10} color={'blue.400'}><Link>Forgot Password?</Link></FormHelperText>
                    </Flex>
                    <Input type={'submit'} value={'Login'} backgroundColor={'blue.400'} color={'white'} fontWeight={'500'} _hover={{backgroundColor: "blue.500"}}/>
                    <FormHelperText mt={5}>Don't have an account? <Link as={RouterLink} to="/signup" color={'blue.400'}>Sign Up</Link></FormHelperText>
                    {invalidlogin && <Alert status="error" borderRadius={'lg'} mt={5} size={'50'}><AlertIcon/><AlertDescription>Username and/or password is incorrect.</AlertDescription></Alert>}
                </FormControl>
                </form>
            </Box>
           
        </Flex>
        </>
    )
}

export default Login;


/*
 <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input value={username} type="text" onChange={e => setUsername(e.target.value)}/>                    
                </label>
                <label>
                    Password
                    <input value={password} type="password" onChange={e => setPassword(e.target.value)}/>                    
                </label>
                <input value="Login" type="submit"></input>
            </form>
            {invalidlogin && <div className="invalid-login">Invalid Username and/or Password</div>}
            <Link to="/signup">Sign Up</Link>
*/