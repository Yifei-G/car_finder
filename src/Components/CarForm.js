import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function CarForm(props){
    const{canEdit,carBrand, carModel, isConvertible, 
        productYear, onBrandChange, onModelChange,onDateChange,onCovertibleChange} = props;

    return(
        <>
        <Container maxWidth='sm'>
            <FormGroup>
                <FormControlLabel
                    control={<Switch
                    checked={isConvertible}
                    onChange={onCovertibleChange}
                    name="carConvertible"
                    color="primary"
                    disabled={!canEdit}
                />}
                    label="Convertible"
                />

                <Grid  container direction="column" justify='space-around' alignItems="center" alignItems="stretch">
                <FormControl variant="outlined" margin='normal' error={!carBrand}>
                    <InputLabel htmlFor="input-brand">Brand*</InputLabel>
                    <OutlinedInput id="input-brand" disabled={!canEdit} value={carBrand} onChange={onBrandChange} label="Brand:"/>
                    {(!carBrand) && <FormHelperText id="input-brand-error-text">The field is requiered!</FormHelperText>}
                </FormControl>

                <FormControl variant="outlined" margin='normal' error={(!carModel)}>
                    <InputLabel htmlFor="input-model">Model*</InputLabel>
                    <OutlinedInput id="input-model" disabled={!canEdit} value={carModel} onChange={onModelChange} label="Model:" />
                    {(!carModel) && <FormHelperText id="input-model-error-text">The field is requiered!</FormHelperText>}
                </FormControl>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                            margin="normal"
                            disabled={!canEdit}
                            id="date-picker-dialog"
                            label="Production date:"
                            format="dd/MM/yyyy"
                            value={productYear}
                            onChange={onDateChange}
                            KeyboardButtonProps={{'aria-label': 'change date'}}
                    />
                </MuiPickersUtilsProvider>
                </Grid>
            </FormGroup>
        </Container>
    </>
    )

}