
import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {carCardStyle} from "../Style/carListSyle.js";

export default function UserForm(props){
    const {canEdit, userGender, userFirstName, 
        userLastName, userEmail, defaultEmail,
        userPassword, carList, 
        onFirstNameChange, onLastNameChange,
        onGenderChange, onEmailChange,
        onPasswordChange, onRepeatPasswordChange,
        onRepeatEmailChange,
        validation, errorMsg
    } = props
    const cardClass = carCardStyle();
    return(
        <>
        <Container maxWidth='sm'>
            <FormGroup autoComplete="off">
                <Grid  container direction="column" justify='space-around' alignItems="center" alignItems="stretch">
                    <FormLabel component="legend">Gender:</FormLabel>
                        <RadioGroup row aria-label="position" onChange={onGenderChange} value={userGender} name="position" defaultValue="top">
                            <FormControlLabel
                                value="Male"
                                control={<Radio color="primary" />}
                                label="Male"
                                labelPlacement="start"
                                disabled={!canEdit}
                            />

                            <FormControlLabel
                                value="Female"
                                control={<Radio color="primary" />}
                                label="Female"
                                labelPlacement="start"
                                disabled={!canEdit}
                            />
                        </RadioGroup>
                    <FormControl variant="outlined" margin='normal' error={!userFirstName}>
                            <InputLabel htmlFor="input-fistName">First name:</InputLabel>
                            <OutlinedInput id="input-fistName" disabled={!canEdit} onChange={onFirstNameChange} value={userFirstName} label="First name:"/>
                            { (!userFirstName) && <FormHelperText id="input-fistName-error-text">The field is requiered!</FormHelperText>}
                    </FormControl>

                    <FormControl variant="outlined" margin='normal' error={!userLastName}>
                            <InputLabel htmlFor="input-lastName">Last name:</InputLabel>
                            <OutlinedInput id="input-lastName" disabled={!canEdit} onChange={onLastNameChange} value={userLastName}  label="Last name:"/>
                            { (!userLastName) && <FormHelperText id="input-lastName-error-text">The field is requiered!</FormHelperText>}
                    </FormControl>


                    <FormControl variant="outlined" margin='normal' error={(!userEmail) || (!validation.validEmail)}>
                            <InputLabel htmlFor="input-email">Email*</InputLabel>
                            <OutlinedInput id="input-email" disabled={!canEdit} type="email" onChange={onEmailChange} value={userEmail} label="Email:" />
                            { (!validation.validEmail) && <FormHelperText id="input-email-error-text">{errorMsg.emailError}</FormHelperText>}
                    </FormControl>

                    { 
                        /* if user doesn't change the email field, then we don't show this text field */
                        (userEmail != defaultEmail) &&
                        <FormControl variant="outlined" margin='normal' error={(!validation.validRepeatEmail)}>
                            <InputLabel htmlFor="input-confirm-email">Repeat Email*</InputLabel>
                            <OutlinedInput id="input-confirm-email" type="email" onChange={onRepeatEmailChange} label="Repeat Email:" />
                            {(!validation.validRepeatEmail) && <FormHelperText id="input-confirm-email-error-text">{errorMsg.repeatEmailError}</FormHelperText>}
                        </FormControl>
                    }

                    {
                        (canEdit) &&
                        <FormControl variant="outlined" margin='normal' autoComplete="off" error={!validation.validPass}>
                            <InputLabel htmlFor="input-password">New Password*</InputLabel>
                                    <OutlinedInput id="input-password" type="password" onChange={onPasswordChange} label="New Password:" autoComplete="new-password" />
                                    {(!validation.validPass) && <FormHelperText id="input-password-error-text">{errorMsg.passwordError}</FormHelperText>}
                            </FormControl>

                    }

                    {
                        (userPassword) &&
                        <FormControl variant="outlined" margin='normal' autoComplete="off" error={(!validation.validRepeatPass)}>
                            <InputLabel htmlFor="input-confirm-password">Repeat Password*</InputLabel>
                            <OutlinedInput id="input-confirm-password" type="password" onChange={onRepeatPasswordChange} label="Repeat Password:" autoComplete="new-password"/>
                            {(!validation.validRepeatPass) && <FormHelperText id="input-confirm-password-error-text">{errorMsg.repeatPassError}</FormHelperText>}
                        </FormControl>

                    } 

                        <List aria-label="user car list">
                            <Typography variant='h4' className={cardClass.h4}>
                                Car list:
                            </Typography>
                            {
                                carList &&
                                carList.map((car) =>
                                    <ListItem key={car.ID}>
                                        <Link component={RouterLink} to={car.URL}>
                                            {car.fullName}
                                        </Link>
                                        <IconButton disabled={!canEdit}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                )
                            }
                        </List>
                </Grid>
            </FormGroup>
        </Container>
        </>
    )
}