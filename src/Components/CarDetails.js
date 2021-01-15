import React from "react";
import {useState, useEffect} from "react";
import useFetch from "../Utils/useFetch.js";
import{useRouteMatch} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import {carCardStyle} from "../Style/carListSyle.js";
import CarForm from './CarForm.js';
export default function CarDetails(){
    const [car, setCar] = useState({});
    const [carBrand, setcarBrand] = useState("");
    const [carModel, setcarModel] = useState("");
    const [isConvertible, setisConvertible] = useState(false);
    const [productYear, setproductYear] = useState();
    const [canEdit,setCanEdit] = useState(false);
    const routeObj = useRouteMatch();
    const requestID = routeObj.params.id;
    const cardClass = carCardStyle();
    const {get} = useFetch("http://localhost:30000/");

    useEffect(()=>{
        (async() =>{
            const data = await get(`car/${requestID}/detail`);
            if(data){
                console.log(data);
                setCar(data.car);
                setcarBrand(data.car.carBrand);
                setcarModel(data.car.carModel);
                setproductYear(data.car.productYear);
                setisConvertible(data.car.convertible);
            }
        })();
    },[]);


    const handleBrandChange = (event) => {
        setcarBrand(event.target.value);
      };

    const handleModelChange = (event) => {
        setcarModel(event.target.value);
      };


    const handleDateChange = (date) => {
        setproductYear(date);
      };


    const handleIsConvertible = (event) => {
        setisConvertible(event.target.checked);
      };

    const handleEditClick = () =>{
        setCanEdit(!canEdit);
    }

    return (
        <>
        <Container component="div" maxWidth="lg">
            <Typography variant="h4" className={cardClass.h4}>
                {car.carFullname}
                <IconButton onClick={handleEditClick}>
                    <CreateIcon />
                </IconButton>
            </Typography>
            
            <CarForm
                canEdit = {canEdit}
                carBrand={carBrand}
                carModel={carModel}
                isConvertible={isConvertible}
                productYear={productYear}
                onBrandChange={handleBrandChange}
                onModelChange={handleModelChange}
                onDateChange={handleDateChange}
                onCovertibleChange={handleIsConvertible}
            />
        </Container>
        </>
    )
    
}