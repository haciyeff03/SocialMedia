import React from 'react';
import Navbar from "../../Layout/Navbar/Navbar";
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import UserWidget from '../Widgets/UserWidget';
import MyPostWidget from "../Widgets/MyPostWidget"
import { useTheme } from '@emotion/react';
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1080px)");
  const { _id, picturePath } = useSelector((state) => state.user)
  const {palette}=useTheme();
  return (
    <Box>
      <Navbar />
      <Box
       
        
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        sx={{backgroundColor:palette.neutral.light}}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
           
            <Box m="2rem 0" />
          
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home