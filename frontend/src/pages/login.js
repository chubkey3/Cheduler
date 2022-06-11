import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Flex, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, HStack, VStack, Text, Alert, AlertIcon, AlertTitle, AlertDescription, Link} from '@chakra-ui/react';

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

        axios.post('http://localhost:3001/login', {username: username, password: password})
            .then(res => {
                navigate('/dashboard')
                localStorage.setItem('token', res.data);
                setInvalidlogin(false);
            })
            .catch(function(error) {
                if (error.response){
                    setInvalidlogin(true);
                }
            })

        setUsername("");
        setPassword("");
    }

    return(
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100vw'} h={'90vh'}>
            <Text fontSize={'3xl'} fontWeight={'bold'} mb={10}>Log In</Text>
            <Box w={['80%', '50%']} p={5} borderRadius={'lg'} maxW={'500px'} boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} bgColor={'blue.100'}>
                <FormControl>
                    <FormLabel htmlFor={'username'}>Username</FormLabel>
                    <Input type={'text'} mb={5} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    <FormLabel htmlFor={'password'}>Password</FormLabel>
                    <Input type={'password'} mb={10} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    <Input type={'submit'} value={'Login'} onClick={handleLogin}/>
                    <FormHelperText mt={5}>Don't have an account? <Link as={RouterLink} to="/signup" color={'blue.400'}>Sign Up</Link></FormHelperText>
                    {invalidlogin && <Alert status="error" borderRadius={'lg'} mt={5} size={'50'}><AlertIcon/><AlertDescription>Username and/or password is incorrect.</AlertDescription></Alert>}
                </FormControl>
            </Box>
           
        </Flex>
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