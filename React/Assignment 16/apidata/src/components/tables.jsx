import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Tables({ data }) {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: '',
  });

  const handledelete = (id) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setAlert({
          show: true,
          type: 'success',
          message: 'User Deleted Successfully',
        });

        setTimeout(() => {
          setAlert({ show: false, type: '', message: '' });
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          show: true,
          type: 'error',
          message: 'Failed to Delete User',
        });

        setTimeout(() => {
          setAlert({ show: false, type: '', message: '' });
        }, 2500);
      });
  };

  return (
    <Box>
      <Box>
        {alert.show && (
          <Alert severity={alert.type}>{alert.message}</Alert>
        )}
      </Box>
      <TableContainer component={Paper} sx={{ width: "1440px", marginLeft: "auto", marginRight: "auto" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.username}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="delete" onClick={() => handledelete(row.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => navigate(`/edituser/${row.id}`)}>
                    <EditIcon sx={{ color: "blue" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
