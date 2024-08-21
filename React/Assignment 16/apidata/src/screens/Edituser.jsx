import { Alert, Box, Button, Paper, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edituser = () => {

    const {id} = useParams();

    const [editData, setEditData] = useState([]);

    useEffect(() => {
        axios
         .get(`http://localhost:3000/users/${id}`)
         .then((res) => setEditData(res.data))
         .catch((err) => console.error(err))
    },[]);
    
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        show: false,
        type: '',
      });
    
    const handleSubmit = (e) => {
        e.preventDefault();


        axios
         .put(`http://localhost:3000/users/${id}`, editData)

         .then((res) =>{ setAlert({
            show: true,
            type: 'success',
            message: 'User Created Successfully'
          });
      
          setTimeout(()=>{
            setAlert({show : false})
            navigate('/');
          },2500)
        })


         .catch((err) => console.error(err)) 
    }

  return (
    <Box sx={{maxWidth:"1440px", marginLeft:"auto", marginRight:"auto"}}>
      <h1 style={{textAlign:"center"}}>Edit User Page</h1>

      <form onSubmit={handleSubmit}>

        <Paper elevation={15} 
          sx={{
            maxWidth:"800px", 
            padding:5,
            ml:"auto",
            mr:"auto"}}>
              <h2 style={{textAlign:"center"}}>Fill User Information</h2>
              {
                alert.show && (
                <Alert severity="success">User Updated Successfully</Alert>
                )
              }
          <Stack sx={{flexDirection:{
            sm:"column",
            md:"column",
            lg:"row"
          }}}>
           <TextField
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              value={editData.name}
               variant="filled" sx={{width:"100%", margin:2}} />
           <TextField
              onChange={(e) => setEditData({...editData, username: e.target.value})}
              value={editData.username} 
               variant="filled" sx={{width:"100%", margin:2}} />
          </Stack>
          <Stack sx={{flexDirection:{
            sm:"column",
            md:"column",
            lg:"row"
          }}}>
           <TextField 
              onChange={(e) => setEditData({...editData, email: e.target.value})}
              value={editData.email}
               variant="filled" sx={{width:"100%", margin:2}} />   
           <TextField
              onChange={(e) => setEditData({...editData, phone: e.target.value})} 
              value={editData.phone}
               variant="filled" sx={{width:"100%", margin:2}} />
          </Stack>
          <Button variant="contained" type='submit' sx={{width:'100%', mt:2}}>Update</Button>
        </Paper>
      </form>
    </Box>
  )
}

export default Edituser
