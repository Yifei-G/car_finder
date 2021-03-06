import React from "react";
import {useState, createContext} from "react";
import {useHistory} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import useFetch from "../Utils/useFetch.js";
import {parentContainer, loginContainer, loginTitle} from "../Style/loginStyle.js";
import Profile from "./Profile.js";
import {verifyEmail, verifyPass} from "../Utils/verification.js";


export default function Login(){
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        validEmail : false,
        validPass: false
    });
    const [userProfile, setUserProfile] = useState(null)
    const [errorMsg, setErrorMsg] = useState("");
    const baseURL = 'http://localhost:30000/';
    const {post} = useFetch(baseURL);
    const pathObj = useHistory();

    const parentCtnStyle = parentContainer();
    const loginCtnStyle = loginContainer();
    const titleStyle = loginTitle();

    function handleEmailChange(event){
        setErrorMsg("");
        setEmail((preValue) => {
            return preValue = event.target.value;
        });
        //validating email format
        const result = verifyEmail(event.target.value);
        //set the result to the validation state
        setValidation((preValue) =>{
            return {...preValue, validEmail: result }
        });
    }

    function handlePasswordChange(event){
        setErrorMsg("");
        setPassword((preValue)=> {
            return preValue = event.target.value;
        });
        //validating password length
        const result = verifyPass(event.target.value);
        //seting the result to the validation state
        setValidation((preValue) =>{
            return {...preValue, validPass: result}
        });
    }

    async function handleLoginClick(){
        const userLogin = {
            email: email,
            password: password
        }
        try{
            const data = await post('users/login', userLogin);
            if(data){
                //console.log(data);
                setUserProfile(data);
            }

        }catch(error){
            console.error(error);
            setErrorMsg(error.message);
        }
    }

    if(userProfile){
        
        //let's save the user profile information into the local storage
        //as a temp workaround
        localStorage.setItem('userID', JSON.stringify(userProfile.user.ID));
        pathObj.push('/user/me');
        return(
            <>
                <Profile userObj={userProfile}/>
            </>
        );
    }



    return(
        <>
        <Container className={parentCtnStyle.root}>
            <Container maxWidth='sm' className={loginCtnStyle.root}>
                <Typography variant="h5" className={titleStyle.h5}>
                        Login to Car finder:
                </Typography>

                {
                    errorMsg &&
                    <Typography color="secondary">{errorMsg}</Typography>
                }

                <FormGroup>
                    <FormControl variant="outlined" margin='normal' error={(email) && (!validation.validEmail)}>
                        <InputLabel  htmlFor="email-input">Email*</InputLabel>
                        <OutlinedInput 
                                required 
                                id="email-input" 
                                type="email" 
                                label="Email" 
                                placeholder="john@example.com" 
                                onChange={handleEmailChange}
                        />
                        {((email) && (!validation.validEmail)) && <FormHelperText id="input-email-error-text">Incorrect Email format!</FormHelperText>}
                    </FormControl>
        
                    <FormControl variant="outlined" margin='normal' error={(password) && (!validation.validPass)}>
                        <InputLabel htmlFor="email-input">Password*</InputLabel>
                         <OutlinedInput 
                            required 
                            id="email-input" 
                            type="password" 
                            label="Password" 
                            placeholder="your password..."
                            onChange={handlePasswordChange}
                        />
                        {((password) && (!validation.validPass)) && <FormHelperText id="input-password-error-text">At least 8 characters!</FormHelperText>}
                    </FormControl>
                </FormGroup>

                <Container>
                    <Box display="flex" justifyContent="center">
                        <Button color="primary">
                            Register
                        </Button>

                        <Button color="primary"  onClick={handleLoginClick} disabled={(!validation.validEmail) || (!validation.validPass)}>
                            Login
                        </Button>
                    </Box>
                </Container>
            </Container>
        </Container>
        </>
        )
}