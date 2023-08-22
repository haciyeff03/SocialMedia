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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween/FlexBetween';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})
const initalValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initalValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const [pallete] = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register= async (values,onSumbitProps)=> {
        const formData=new FormData();
        for (let value in values) {
            formData.append(value,values[value])
        }
        formData.append('picturePath', values.picture.name);
        const savedUserResponse=await fetch(
            "htpp://localhost:3001/auth/register",
            {
                method:"POST",
                body: formData,
            }
        );
        const savedUser=await savedUserResponse.json();
        onSumbitProps.resetForm();

        if (savedUser )
        {
            setPageType("login");
        }
    };

    const login= async (values,onSumbitProps)=> {
              const loggedInResponse=await fetch(
            "htpp://localhost:3001/auth/login",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn=await loggedInResponse.json();
        onSumbitProps.resetForm();

        if (loggedIn )
        {
           dispatch(
            setLogin({
                user:loggedIn.user,
                token:loggedIn.token,
            })
           );
           navigate("/home");
        }
    }


    const handleFormSumbit = async (values, onSumbitProps) => {
        if (isLogin) await login(values, onSumbitProps);
        if (isRegister) await register(values, onSumbitProps);
     };
    return (
        <Formik onSubmit={handleFormSumbit}
            initialValues={isLogin ? initalValuesLogin : initalValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSumbit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSumbit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4 , minmax (0, 1fr))"
                        sx={{
                            "&> div":
                                { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}>
                        {
                            isRegister && (
                                <>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="First Name"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 2" }} />

                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="Last Name"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: "span 2" }} />

                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="Location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridColumn: "span 4" }} />

                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="Occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: "span 4" }} />

                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${pallete.neutral.medium}`}
                                        borderRadius="5px"
                                        padding="1rem">
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])}>
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${pallete.primary.main}`}
                                                    padding="1rem"
                                                    sx={{ "& :hover ": { cursor: "pointer" } }}>
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p> Add picture here,my friend!</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>
                                                                {values.picture.name}
                                                            </Typography>
                                                            <EditOutlinedIcon />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )
                        }
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="Email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }} />

                        <TextField
                            type="password"
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="Password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }} />
                    </Box>
                    {/* Button */}
                    <Box>
                        <Button
                            fullWidth
                            type="sumbit"
                            sx={{
                                margin: "2rem 0",
                                padding: "1rem",
                                backgroundColor: pallete.primary.main,
                                color: pallete.background.alt,
                                "&:hover ": { color: pallete.primary.main },
                            }}>
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: pallete.primary.main,
                                "&:hover ": {
                                    cursor: "pointer",
                                    color: pallete.primary.light
                                },
                            }}>
                            {isLogin ? "Don't have an account? Sign up here."
                                :
                                "Already have an account?Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default Form;