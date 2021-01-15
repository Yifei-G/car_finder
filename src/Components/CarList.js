import React from "react";
import {useState, useEffect} from "react";
import useFetch from "../Utils/useFetch.js";
import {Link} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {carContiner, carCardStyle} from "../Style/carListSyle.js";


export default function CarList(){
    const [carList, setCarList] = useState();
    const containerClass = carContiner();
    const cardClass = carCardStyle();
    const {get} = useFetch("http://localhost:30000/");
    useEffect(()=>{
        (async() =>{
            const data = await get('car/all');
            if(data){
                console.log(data);
                setCarList(data.carList);
            }
        })();
    },[]);


return (
    <>
    <Container component="div" maxWidth="lg">

    <ul className={containerClass.root}>
    {carList && carList.map((car,index) => 
    <Card key={car.ID} className={cardClass.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" className={cardClass.h5} paragraph>
                    Car No.{index + 1}
                </Typography>

                <Container>
                <Typography display="inline" variant="h6" className={cardClass.title}>
                    Brand: 
                </Typography>

                <Typography display="inline" variant="h6" className={cardClass.h6}>
                    {car.carBrand}
                </Typography>

                </Container>


                <Container>
                <Typography display="inline"  variant="h6" className={cardClass.title}>
                    Year of production:
                </Typography>

                <Typography display="inline" variant="h6" className={cardClass.h6}>
                    {new Date(car.productYear).getFullYear()}
                </Typography>

                </Container>
            </CardContent>
                <CardActions>
                    <Link to={`${car.URL}`}>
                        <Button size="small" color="primary">
                            View details
                        </Button>
                    </Link>
                </CardActions>
        </Card>)}
    </ul>
    </Container>
    </>
);
}