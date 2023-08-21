import React from 'react'
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import  EditOutlined  from '@mui/icons-material/EditOutlined';
import {Formik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import { Password } from '@mui/icons-material';
const registerSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required")
})
const loginSchema= yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required")
 })
 const initalValuesRegister= {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
 };

 const initalValuesLogin= {
    email:"",
    password:"",
 };
 
 const Form =()=> {
const [pageType,setPageType]=useState("login");
const [pallete]=useTheme();
const dispatch= useDispatch();
const navigate=useNavigate();
const isNonMobile=useMediaQuery("(min-width:600px)");
const isLogin=pageType==="login";
const isRegister=pageType==="register";
const handleFormSumbit=async(values,onSumbitProps)=> {};
return (
    <Formik onSubmit={handleFormSumbit}
    initialValues={isLogin ? initalValuesLogin : initalValuesRegister}
    validationSchema={isLogin ? loginSchema : registerSchema}>

    </Formik>
) 
} 
 export default Form;