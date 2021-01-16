import React from "react";
import {useState, useEffect} from "react";
import useFetch from "../Utils/useFetch.js";
import{useRouteMatch} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {carCardStyle} from "../Style/carListSyle.js";
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
    const [updateCmpted, setupdateCmpted] = useState(false);
    const [loading, setLoading] = useState(true);
    const routeObj = useRouteMatch();
    const requestID = routeObj.params.id;
    const cardClass = carCardStyle();
    const {get} = useFetch(baseURL);
    const {update} = useFetch(baseURL);

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
                setupdateCmpted(true);
            }
            else{
                console.log(data);
                setupdateCmpted(true);
            }
        })();  
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setupdateCmpted(false);
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
            

            <Snackbar anchorOrigin={{vertical:'bottom', horizontal: 'left'}} open={updateCmpted} autoHideDuration={2000} onClose={handleClose}>
                <MuiAlert  severity="success" elevation={10} variant="filled">
                    Updated successfully
                </MuiAlert>
            </Snackbar>

            <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={(!canEdit) || (!car.carBrand) || (!car.carModel)}
                    onClick={handleCarUptClick}
                    >
                    Update
            </Button>
        </Box>
        </>
    )
    
}