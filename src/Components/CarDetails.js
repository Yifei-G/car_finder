import React from "react";
import {useState, useEffect} from "react";
import useFetch from "../Utils/useFetch.js";
import{useRouteMatch,useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {carCardStyle} from "../Style/carListSyle.js";
import{btnContainer} from '../Style/carDetailsStyle.js'
import CarForm from './CarForm.js';
export default function CarDetails(){
    const baseURL = 'http://localhost:30000/';
    const [car, setCar] = useState({
        carBrand: '',
        carModel: '',
        convertible: false,
        productYear: null
    });
    const [canEdit,setCanEdit] = useState(false);
    const [requestCmpted, setRequestCmpted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alertMsg, setAlertMsg] = useState("");
    const [severity, setSeverity] = useState({})
    const [redirect, setRedirect] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const routeObj = useRouteMatch();
    const pathObj = useHistory();
    const requestID = routeObj.params.id;
    const cardClass = carCardStyle();
    const contanerClass = btnContainer();
    const {get,update,errase} = useFetch(baseURL);  
    useEffect(()=>{
        (async() =>{
            const data = await get(`car/${requestID}/detail`);
            if(data.car){
                setCar(data.car);
                setLoading(false);
            }
            else{
                console.log(data);
                setLoading(false);
            }
        })();
    },[]);

    
    const handleBrandChange = (event) => {
        setCar({...car, carBrand:event.target.value});
      };

    const handleModelChange = (event) => {
        setCar({...car, carModel:event.target.value});
      };


    const handleDateChange = (date) => {
        setCar({
            ...car, productYear: date.toISOString(),
        })
      };

    const handleIsConvertible = (event) => {
        setCar({...car, convertible:event.target.checked});
      };

    const handleEditClick = () =>{
        setCanEdit(!canEdit);
    }

    const handleCarUptClick = () =>{
        let updatedCar = {
            'carBrand': car.carBrand,
            'carModel': car.carModel,
            'productYear': car.productYear,
            'convertible': car.convertible,
        };

        (async()=>{
            const data = await update(`car/${requestID}/update`,updatedCar);
            if(data.modifiedCar){
                setCar(data.modifiedCar);

                //dynamically change Alert component message and severity
                setSeverity({...severity, level:'success'});
                setAlertMsg('Updated successfully!');
                setRequestCmpted(true);
            }
            else{
                console.log(data);
                //dynamically change Alert component message and severity
                setSeverity({...severity, level:'error'});
                setAlertMsg('Opss..Something went wrong!');
                setRequestCmpted(true);
            }
        })();  
    }


    const handleCarDltClick = ()=>{
        (async()=>{
            const data = await errase(`car/${requestID}/delete`);
            if(data.message){
                setSeverity({...severity, level:'success'});
                setAlertMsg('Deleted successfully!');
                setRedirect(true);
                setRequestCmpted(true);
            }
            else{
                console.log(data);
                setSeverity({...severity, level:'error'});
                setAlertMsg('Opss..Something went wrong!');
                setRequestCmpted(true);
            }
        })();  
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setRequestCmpted(false);
        //Only redirect the page, when user delete a car
        if(redirect){
            pathObj.push('/car/all');
        }
        
      };

    return (
        <>
        <Box component="div" display='flex' alignItems='center' flexDirection='column'>
            <Typography variant="h4" className={cardClass.h4}>
                {car.carFullname}
                <IconButton onClick={handleEditClick}>
                    <CreateIcon />
                </IconButton>
            </Typography>

            {
                loading &&
                <CircularProgress />
            }

            {
                !loading &&
                <CarForm
                    canEdit = {canEdit}
                    carBrand={car.carBrand}
                    carModel={car.carModel}
                    isConvertible={car.convertible}
                    productYear={car.productYear}
                    onBrandChange={handleBrandChange}
                    onModelChange={handleModelChange}
                    onDateChange={handleDateChange}
                    onCovertibleChange={handleIsConvertible}
                />
            }
            

            <Snackbar anchorOrigin={{vertical:'bottom', horizontal: 'left'}} open={requestCmpted} autoHideDuration={1000} onClose={handleClose}>
                <MuiAlert  severity={severity.level} elevation={10} variant="filled">
                    {alertMsg}
                </MuiAlert>
            </Snackbar>

            <Container maxWidth='sm' className={contanerClass.root}>
                <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        disabled={(!canEdit) || (!car.carBrand) || (!car.carModel)}
                        onClick={() =>setDeleteDialog(true)}
                        >
                        Delete
                </Button>

                <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        disabled={(!canEdit) || (!car.carBrand) || (!car.carModel)}
                        onClick={handleCarUptClick}
                        >
                        Update
                </Button>
            </Container>

            <Dialog
                open={deleteDialog}
                onClose={()=> setDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this Car?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm that you want to remove this Car from the App?
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={()=> setDeleteDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCarDltClick} color="secondary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

           
        </Box>
        </>
    )
    
}