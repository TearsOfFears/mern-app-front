import { Box } from '@mui/material';
import React from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { userService } from '../reactQuery/auth/user.service';

const Activate = () => {
    const {link} =useParams();
    const navigate = useNavigate();
    const {data} = useQuery(["activate account",link],()=>userService.activateUserAccount(link))
    return navigate("/login")
}

export default Activate