import React from 'react';
import Navbar from "../../Layout/Navbar/Navbar";
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import UserWidget from '../Widgets/UserWidget';
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from 'Pages/Widgets/PostsWidget';
import FriendListWidget from 'Pages/Widgets/FriendListWidget';
import AdvertWidget from 'Pages/Widgets/AdvertWidget';
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1080px)");
  const { _id, picturePath } = useSelector((state) => state.user)
  
  return (
    <Box>
      <Navbar />
      <Box
        
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
             <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;