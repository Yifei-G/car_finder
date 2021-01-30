import React from "react";
import {useState, useEffect, useLayoutEffect} from "react";
import Box from '@material-ui/core/Box';
import {carCardStyle} from "../Style/carListSyle.js";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserForm from './UserForm.js';
import useFetch from "../Utils/useFetch.js";
import {verifyEmail, verifyPass} from "../Utils/verification.js";
export default function Profile(props){
    //geting user Object from localStorage
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        gender:"",
        password:"",
        car:[]
    });
    const [defaultEmail, setDefaultEmail] = useState("");
    const [repeatEmail, setRepeatEmail] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [validation, setValidation] = useState({
        validEmail : true,
        validPass: true,
        validRepeatEmail: false,
        validRepeatPass: false,
    });
    const [canEdit,setCanEdit] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const baseURL = 'http://localhost:30000/';
    const {get,update} = useFetch(baseURL);  
    //console.log(props.userObj);
    //console.log(user);
    const cardClass = carCardStyle();

    useLayoutEffect(()=>{
        const userID = JSON.parse(localStorage.getItem("userID"));
        (async() =>{
            const data = await get(`users/${userID}/detail`);
            if(data.user){
                setUser(data.user);
                //let's safe user's email from the server into a state variable
                setDefaultEmail(data.user.email);     
            }
            else{
                console.log(data);
            }
            setLoading(false);
        })();
    },[]);

    //this useEffect runs erro verification checks
    useEffect(()=>{
        if(user.email){
            setErrorMsg((preValue)=>{
                return {...preValue, emailError:"Incorrect email format!"}
            })
        }else{
            setErrorMsg((preValue)=>{
                return {...preValue, emailError:"This field is requiered!"}
            });
        }

        if(user.password){
            setErrorMsg((preValue)=>{
                return {...preValue, passwordError:"The password must be at least 8 characters!"}
            });
        }

        canUpdateUser();
    },[user,repeatEmail,repeatPassword])

    function handleFirstNameChange(event){
        setUser({...user, firstName: event.target.value})
    }

    function handleLastNameChange(event){
        setUser({...user, lastName: event.target.value})
    }

    function handleGenderChange(event){
        setUser({...user, gender:event.target.value})
    }

    function handleEmailChange(event){
        setUser((preValue) =>{
            return preValue = {...preValue, email:event.target.value}
        });

        //validating email format
        const result = verifyEmail(event.target.value);
        //set the result to the validation state
        //state update is async
        //let's update the validation state using a functional update
        setValidation((preValue)=>{
            return preValue = {...preValue, validEmail:result};
        });

        //state update is async
        //let's update the validation state using a functional update
        //so the latest email value is event.target.value
        //we compare with the repeatEmail value to verify the validation
        if(event.target.value === repeatEmail){
            setValidation((preValue) =>{
                return preValue = {...preValue, validRepeatEmail: true };
            })
        }else{
            setValidation((preValue) =>{
                return preValue = {...preValue, validRepeatEmail: false };
            })
        }

    }

    function handleRepeatEmailChange(event){
        setRepeatEmail(event.target.value);
        user.email === event.target.value ? setValidation({...validation, validRepeatEmail: true }) : setValidation({...validation, validRepeatEmail: false });
        setErrorMsg({...errorMsg, repeatEmailError:"The email address doesn't match!!!"});
    }

    function handlePasswordChange(event){
        
        setUser({...user, password: event.target.value});
        //validating password length
        let result = true;
        if(event.target.value !== ""){
            result = verifyPass(event.target.value);
        }else{
            //if user empty the password field
            // we should also empty the repeat password field
            setRepeatPassword((preValue) =>{
                return preValue = event.target.value;
            });
        }
        
        //set the result to the validation state
        setValidation((preValue)=>{
            return {...preValue, validPass: result}
        });

        if(event.target.value === repeatPassword){
            setValidation((preValue) =>{
                return preValue = {...preValue, validRepeatPass: true };
            })
        }else{
            setValidation((preValue) =>{
                return preValue = {...preValue, validRepeatPass: false };
            })
        }
    }

    function handleRepeatPasswordChange(event){
        setRepeatPassword((preValue) =>{
            return preValue = event.target.value;
        });
        if(user.password === event.target.value){
            setValidation((preValue) =>{
                return {...preValue, validRepeatPass: true }
            })
        }else{
            setValidation((preValue) =>{
                return {...preValue, validRepeatPass: false }
            })
        }
        setErrorMsg({...errorMsg, repeatPassError:"The password doesn't match!!!"});
    }


    function canUpdateUser(){
        setCanUpdate(false);
        //user doesn't modify the email nor the password
        if((user.email === defaultEmail) && !user.password ){
            setCanUpdate(true)
        }
        //user only modifying the email field
        else if((user.email !== defaultEmail) && !user.password ){
            //we need to be sure that email is in the correct format
            //the email field is the same as the repeat email field
            if((validation.validEmail) && (validation.validRepeatEmail)){
                setCanUpdate(true)
            }
            
        // user modifying the password field
        }else if((user.email === defaultEmail) && user.password){
            //we need to be sure password is at least 8 characters
            //the password is the same as the repeat password field
            if((validation.validPass) && (validation.validRepeatPass) ){
                setCanUpdate(true)
            }

        //user modifying the email and the password field  
        }else if((user.email !== defaultEmail) && user.password){
            // be sure of above cases 
            if(((validation.validEmail) && (validation.validRepeatEmail)) 
                && ((validation.validPass) && (validation.validRepeatPass)) ){
                setCanUpdate(true)
            }
        }

    }



    async function handleuserUpdateClick(){

        //let's do the update validation again
        if(canUpdate){
            let updatedUser = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "gender": user.gender,
                "car": [],
            }
            user.password ? updatedUser.password = user.password : updatedUser.password = undefined;
            const data = await update(`users/${user.ID}/update`,updatedUser);
            if(data.updatedUser){
                console.log(data.updatedUser);
            }
            else{
                console.log(data);
            }
        }else{
            console.log("You can't update, check if the form is correct validated!")
        }
    }

    function handleEditClick(){
        setCanEdit(!canEdit);
    }
    return (
        <>
            <Box component="div" display='flex' alignItems='center' flexDirection='column'>
                    <Typography variant="h4" className={cardClass.h4}>
                        User profile
                        <IconButton onClick={handleEditClick}>
                            <CreateIcon />
                        </IconButton>
                        <Button variant="contained" 
                        disabled={( (!canEdit) || (!user.firstName) || (!user.lastName) || (!user.email) || (!canUpdate) )} 
                        onClick={handleuserUpdateClick} 
                        startIcon={<SaveIcon />} 
                        color="primary">
                            Update
                        </Button>
                    </Typography>

                    {
                        loading &&
                        <CircularProgress />
                    }

                    {
                        !loading &&
                        <UserForm
                        canEdit = {canEdit}
                        userGender = {user.gender} 
                        userFirstName = {user.firstName}
                        onFirstNameChange = {handleFirstNameChange}
                        onLastNameChange = {handleLastNameChange}
                        onGenderChange = {handleGenderChange}
                        onEmailChange = {handleEmailChange}
                        onRepeatEmailChange = {handleRepeatEmailChange}
                        onPasswordChange = {handlePasswordChange}
                        onRepeatPasswordChange = {handleRepeatPasswordChange}
                        userLastName = {user.lastName}
                        userEmail = {user.email}
                        userPassword = {user.password}
                        defaultEmail = {defaultEmail}
                        repeatEmail = {repeatEmail}
                        repeatPass = {repeatPassword}
                        carList = {user.car}
                        validation = {validation}
                        errorMsg = {errorMsg}
                        />
                    }
            </Box>  
        </>
    )
}