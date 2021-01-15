import React from "react";
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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

                <Grid container md='4' direction="column" justify='space-around' alignItems="center" alignItems="stretch">
                <FormControl variant="outlined" margin='normal'>
                    <InputLabel htmlFor="input-brand">Brand</InputLabel>
                    <OutlinedInput id="input-brand" disabled={!canEdit} value={carBrand} onChange={onBrandChange} label="Brand:" />
                </FormControl>

                <FormControl variant="outlined" margin='normal'>
                    <InputLabel htmlFor="input-model">Model</InputLabel>
                    <OutlinedInput id="input-model" disabled={!canEdit} value={carModel} onChange={onModelChange} label="Model:" />
                </FormControl>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                            margin="normal"
                            disabled={!canEdit}
                            id="date-picker-dialog"
                            label="Production Year:"
                            format="MM/dd/yyyy"
                            value={productYear}
                            onChange={onDateChange}
                            KeyboardButtonProps={{'aria-label': 'change date'}}
                    />
                </MuiPickersUtilsProvider>
                </Grid>
            </FormGroup>
        </>
    )

}