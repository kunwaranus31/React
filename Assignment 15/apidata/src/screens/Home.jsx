import React, { useEffect, useState } from 'react'
import Tables from '../components/tables'
import axios from 'axios'
import { Box, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const[userData, setUserData] = useState([]);

    useEffect (() => { 
        axios
         .get("http://localhost:3000/users/")
         .then((res) => setUserData(res.data))
         .catch((err) => console.log(err))
    },[]);

    console.log(userData)

    const navigate = useNavigate()

  return (
    <Box sx={{width:"1440px", marginLeft:"auto", marginRight:"auto"}}>
      <h1 style={{textAlign:"center"}}>User Data</h1>
        <Button 
          variant="contained" 
          startIcon={<PersonIcon />} 
          sx={{float:"right", marginBottom:4}} 
          onClick={() => navigate('createuser')}
          >
            Create User
        </Button>

      <Tables data={userData}/>
    </Box>
  )
}

export default Home
