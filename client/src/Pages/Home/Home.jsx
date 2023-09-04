import React from 'react';
import "./home.scss";
import Navbar from "../../Layout/Navbar/Navbar";
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import UserWidget from 'Pages/Widgets/UserWidget';
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1080px)");
  const { _id, picturePath } = useSelector((state) => state.user)
  return (
    <Box>
      <Navbar />
      <Box width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between">
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "2rem"}> 
          
          </Box>
          { isNonMobileScreens && (
            <Box flexBasis="26%">
              </Box>
          )}
      </Box>
    </Box>
  )
}

export default Home