import React from "react";
import {useState, useEffect} from "react";
import Box from '@material-ui/core/Box';
import {carCardStyle} from "../Style/carListSyle.js";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import UserForm from './UserForm.js';
import useFetch from "../Utils/useFetch.js";

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
    const [canEdit,setCanEdit] = useState(false);

    const [repeatEmail, setRepeatEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [validation, setValidation] = useState({
        validEmail : true,
        validPass: false,
        validRepeatEmail: true
    });

    const baseURL = 'http://localhost:30000/';
    const {get,update} = useFetch(baseURL);  
    //console.log(props.userObj);
    //console.log(user);
    const cardClass = carCardStyle();

    useEffect(()=>{
        const userID = JSON.parse(localStorage.getItem("userID"));
        (async() =>{
            const data = await get(`users/${userID}/detail`);
            if(data.user){
                setUser(data.user);     
            }
            else{
                console.log(data);
            }
        })();
    },[]);

    function verifyEmail(email){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //console.log(re.test(String(email).toLowerCase()));
        return re.test(String(email).toLowerCase());
    }

    function verifyPass(password){
        //console.log((password.length > 8 ? true : false))
        return (password.length > 8 ? true : false);
    }

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
        setErrorMsg({...errorMsg, emailError:"Incorrect email format!"});
        setUser({...user, email:event.target.value});
        //validating email format
        const result = verifyEmail(event.target.value);
        //set the result to the validation state
        setValidation({...validation, validEmail: result });
    }

    function handleRepeatEmailChange(event){
        setRepeatEmail(event.target.value);
        user.email == event.target.value ? setValidation({...validation, validRepeatEmail: true }) : setValidation({...validation, validRepeatEmail: false });
        setErrorMsg({...errorMsg, repeatEmailError:"The email address doesn't match!!!"});
    }



    async function handleuserUpdateClick(){
        let updatedUser = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "gender": user.gender,
            "car": [],
        }
        const data = await update(`users/${user.ID}/update`,updatedUser);
        if(data.updatedUser){
            console.log(data.updatedUser);
        }
        else{
            console.log(data);
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
                        <Button variant="contained" disabled={!canEdit} onClick={handleuserUpdateClick} startIcon={<SaveIcon />} color="primary">
                            Update
                        </Button>
                    </Typography>

                    <UserForm
                        canEdit = {canEdit}
                        userGender = {user.gender} 
                        userFirstName = {user.firstName}
                        onFirstNameChange = {handleFirstNameChange}
                        onLastNameChange = {handleLastNameChange}
                        onGenderChange = {handleGenderChange}
                        onEmailChange = {handleEmailChange}
                        onRepeatEmailChange = {handleRepeatEmailChange}
                        userLastName = {user.lastName}
                        userEmail = {user.email}
                        carList = {user.car}
                        validation = {validation}
                        errorMsg = {errorMsg}
                    
                    />
            </Box>  
        </>
    )
}