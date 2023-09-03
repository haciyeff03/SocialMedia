import { useState,useEffect } from "react";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { UseSelector, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Box,Typography,Divider,useTheme} from "@mui/material";
import UserImage from "../../components/UserImage/UserImage"
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper/WidgetWrapper";

const UserWidget =({userId,picturePath})=>{
    const [user,setUser]=useState(null);
    const [palette]=useTheme();
    const navigate=useNavigate();
    const token=useSelector((state)=>state.token);
    const dark=palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;

    const getUser=async()=> {
        const response=await fetch(`http://localhost:3001/user/${userId}`,
        {
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        const data=await response.json();
        setUser(data);
    };
    useEffect(()=>{
        getUser();
    },[])


    if (!user)
    {
        return null;
    }
    const {
        firstName,
        lastName,
        location,
        viewedProfile,
        impressions,
        friends,
    }=user;
    return(
        <WidgetWrapper>
            {/*first row */}
            <FlexBetween
            gap="0.5rem"
            paddingBottom="1.1rem"
            onClick={()=> navigate(`/profile/${userId}`)}>
                <FlexBetween
                gap="1rem">

                </FlexBetween>
                
            </FlexBetween>
        </WidgetWrapper>
    )

}