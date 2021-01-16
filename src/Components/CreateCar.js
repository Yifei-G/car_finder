import React from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import useFetch from "../Utils/useFetch.js";
import Box from '@material-ui/core/Box';
import CarForm from './CarForm.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {carCardStyle} from "../Style/carListSyle.js";
export default function CreateCar(){

    const baseURL = 'http://localhost:30000/';
    const [car, setCar] = useState({
        carBrand: 'Car brand...',
        carModel: 'Car model...',
        convertible: false,
        productYear: null
    });

    const {create} = useFetch(baseURL);
    
    const pathObj = useHistory();

    const cardClass = carCardStyle();

    const [createCmpted, setcreateCmpted] = useState(false);

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

      const handleCarCrtClick = () =>{
        let newCar = {
            'carBrand': car.carBrand,
            'carModel': car.carModel,
            'productYear': car.productYear,
            'convertible': car.convertible,
        };

        (async()=>{
            const data = await create(`car/create`,newCar);
            if(data.newCar){
                setCar({
                    carBrand: 'Car brand...',
                    carModel: 'Car model...',
                    convertible: false,
                    productYear: null
                })
                setcreateCmpted(true);
            }
            else{
                console.log(data);
                setcreateCmpted(true);
            }
        })();  
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setcreateCmpted(false);
        pathObj.push('/car/all');

      };


    return(
        <>
            <Box component="div" display='flex' alignItems='center' flexDirection='column'>
                <Typography variant="h4" className={cardClass.h4}>
                    Create a new Car:
                </Typography>

                <CarForm
                    canEdit = {true}
                    carBrand={car.carBrand}
                    carModel={car.carModel}
                    isConvertible={car.convertible}
                    productYear={car.productYear}
                    onBrandChange={handleBrandChange}
                    onModelChange={handleModelChange}
                    onDateChange={handleDateChange}
                    onCovertibleChange={handleIsConvertible}
                />

                <Snackbar anchorOrigin={{vertical:'bottom', horizontal: 'left'}} open={createCmpted} autoHideDuration={1000} onClose={handleClose}>
                    <MuiAlert  severity="success" elevation={10} variant="filled">
                        Created successfully!
                    </MuiAlert>
                </Snackbar>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    disabled={(createCmpted) || (!car.carBrand) || (!car.carModel)}
                    onClick={handleCarCrtClick}
                    >
                    Create
                </Button>
            </Box>
        </>
    )
}