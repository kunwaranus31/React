import { Alert, Box, Button, Paper, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createuser = () => {

  const [createData, setCreateData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  
  const [alert, setAlert] = useState({
    show: false,
    type: '',
  });

  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();

    axios
    .post('http://localhost:3000/users/', createData)
    .then((res) =>{ setAlert({
      show: true,
      type: 'success',
      message: 'User Created Successfully'
    });

    setTimeout(()=>{
      setAlert({show : false})
      navigate('/');
    },2000)

    setCreateData({
      name:"",
      username:"",
      email:"",
      phone:"",
  });
   })
    .catch((err) => alert(err))
  };
  


  return (
    <Box sx={{maxWidth:"1440px", marginLeft:"auto", marginRight:"auto"}}>
      <h1 style={{textAlign:"center"}}>Create User Page</h1>

      <form onSubmit={handlesubmit}>

        <Paper elevation={15} 
          sx={{
            maxWidth:"800px", 
            padding:5,
            ml:"auto",
            mr:"auto"}}>
              <h2 style={{textAlign:"center"}}>Fill User Information</h2>
              {
                alert.show && (
                <Alert severity="success">User Created Successfully</Alert>
                )
              }
          <Stack sx={{flexDirection:{
            sm:"column",
            md:"column",
            lg:"row"
          }}}>
           <TextField 
              value={createData.name}
              onChange={(e) => 
                setCreateData({ ...createData,name:e.target.value})
              } 
              label="Name" variant="standard" sx={{width:"100%", margin:2}} />
           <TextField 
              value={createData.username}
              onChange={(e) => 
                setCreateData({ ...createData,username:e.target.value})
              } 
              label="Username" variant="standard" sx={{width:"100%", margin:2}} />
          </Stack>
          <Stack sx={{flexDirection:{
            sm:"column",
            md:"column",
            lg:"row"
          }}}>
           <TextField 
              value={createData.email}
              onChange={(e) => 
                setCreateData({ ...createData,email:e.target.value})
              } 
              label="Email" variant="standard" sx={{width:"100%", margin:2}} />
           <TextField 
              value={createData.phone}
              onChange={(e) => 
                setCreateData({ ...createData,phone:e.target.value})
              } 
              label="Phone" variant="standard" sx={{width:"100%", margin:2}} />
          </Stack>
          <Button variant="contained" type='submit' sx={{width:'100%', mt:2}}>Create</Button>
        </Paper>
      </form>
    </Box>
  )
}

export default Createuser
