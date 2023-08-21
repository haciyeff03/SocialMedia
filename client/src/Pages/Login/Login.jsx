import React from 'react';
import Form from "../Form/Form"
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
const Login = () => {
  const theme=useTheme();;
  const isNonMobileScreens=useMediaQuery("(min-width:1000px)")
  return (
    <Box>
      <Box  backgroundColor={theme.palette.background.alt}
       padding="2.5rem 6%"
       textAlign="center"> 
      <Typography
          fontWeight="bold"
          fontSize="40px"
          color="primary"
         
        >
          Socialmedia
        </Typography>
      </Box>
      <Box
      width={isNonMobileScreens ? "50%" : "92%"}
      padding="2rem"
      margin="2rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt}>
        <Typography fontWeight="500" variant='h4' sx={{mb:".15ren"}}>
          Welcome to Social Media!
        </Typography>
        <Form/>
      </Box>
      </Box>
  )
}

export default Login