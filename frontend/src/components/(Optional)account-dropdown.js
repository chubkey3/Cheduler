import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IoPerson} from 'react-icons/io5';
import {Icon} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';

function AccountDropdown(){
    const [dropdownactive, setDropdownActive] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <Box>
            <button onClick={logout}><Icon as={IoPerson}/></button>
        </Box>
    )
}

export default AccountDropdown;