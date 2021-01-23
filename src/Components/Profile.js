import React from "react";
import {useState} from "react";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {carCardStyle} from "../Style/carListSyle.js";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import UserForm from './UserForm.js';
export default function Profile(props){
    //geting user Object from localStorage
    const [user, setUser] = useState(()=>{
        const data =  JSON.parse(localStorage.getItem('userObj'));
        return data.user;
    })
    const [canEdit,setCanEdit] = useState(false);
    
    //console.log(props.userObj);
    console.log(user);
    const cardClass = carCardStyle();

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
                    </Typography>

                    <UserForm
                        canEdit = {canEdit}
                        userGender = {user.gender} 
                        userFirstName = {user.firstName}
                        userLastName = {user.lastName}
                        userEmail = {user.email}
                        carList = {user.car}
                    
                    />
            </Box>  
        </>
    )
}