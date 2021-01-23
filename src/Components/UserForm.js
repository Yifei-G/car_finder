
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
import {carCardStyle} from "../Style/carListSyle.js";

export default function UserForm(props){
    const {canEdit, userGender, userFirstName, userLastName, userEmail, carList} = props
    const cardClass = carCardStyle();
    return(
        <>
        <Container maxWidth='sm'>
            <FormGroup autoComplete="off">
                <Grid  container direction="column" justify='space-around' alignItems="center" alignItems="stretch">
                    <FormLabel component="legend">Gender:</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                                value="Male"
                                control={<Radio color="primary" />}
                                label="Male"
                                labelPlacement="start"
                                checked={userGender === "Male"}
                                disabled={!canEdit}
                            />

                            <FormControlLabel
                                value="Female"
                                control={<Radio color="primary" />}
                                label="Female"
                                labelPlacement="start"
                                checked={userGender === "Female"}
                                disabled={!canEdit}
                            />
                        </RadioGroup>
                    <FormControl variant="outlined" margin='normal'>
                            <InputLabel htmlFor="input-fistName">First name:</InputLabel>
                            <OutlinedInput id="input-fistName" disabled={!canEdit} value={userFirstName} label="First name:"/>
                            { canEdit && <FormHelperText id="input-fistName-error-text">The field is requiered!</FormHelperText>}
                    </FormControl>

                    <FormControl variant="outlined" margin='normal'>
                            <InputLabel htmlFor="input-lastName">Last name:</InputLabel>
                            <OutlinedInput id="input-lastName" disabled={!canEdit} value={userLastName}  label="Last name:"/>
                            { (canEdit) && <FormHelperText id="input-lastName-error-text">The field is requiered!</FormHelperText>}
                    </FormControl>


                    <FormControl variant="outlined" margin='normal'>
                            <InputLabel htmlFor="input-email">Email*</InputLabel>
                            <OutlinedInput id="input-email" disabled={!canEdit} type="email" value={userEmail} label="Email:" />
                            { (canEdit) && <FormHelperText id="input-email-error-text">The field is requiered!</FormHelperText>}
                    </FormControl>

                    { (canEdit) &&
                        <FormControl variant="outlined" margin='normal'>
                            <InputLabel htmlFor="input-confirm-email">Repeat Email*</InputLabel>
                            <OutlinedInput id="input-confirm-email" type="email" label="Repeat Email:" />
                            <FormHelperText id="input-confirm-email-error-text">The field is requiered!</FormHelperText>
                        </FormControl>
                    }

                    {
                        (canEdit) &&
                        <FormControl variant="outlined" margin='normal' autoComplete="off">
                            <InputLabel htmlFor="input-password">New Password*</InputLabel>
                                    <OutlinedInput id="input-password" type="password" label="New Password:" autoComplete="new-password" />
                                    <FormHelperText id="input-password-error-text">The field is requiered!</FormHelperText>
                            </FormControl>

                    }



                    {
                        (canEdit) &&
                        <FormControl variant="outlined" margin='normal' autoComplete="off">
                            <InputLabel htmlFor="input-confirm-password">Repeat Password*</InputLabel>
                            <OutlinedInput id="input-confirm-password" type="password" label="Repeat Password:" autoComplete="new-password"/>
                            <FormHelperText id="input-confirm-password-error-text">The field is requiered!</FormHelperText>
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