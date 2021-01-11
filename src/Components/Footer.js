import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {footerContainer, footerText} from '../Style/footerStyle.js';
export default function Footer(){
    const containerStyle = footerContainer();
    const textStyle = footerText();
    return(
        <>
            <Container className={containerStyle.root} maxWidth="xl" component='footer' >
                <Typography variant='h5' align='center' className={textStyle.h5}>
                    This is an academic project
                </Typography>
                <Typography align='center' className={textStyle.root}>
                    Made by Yifei with &hearts;
                </Typography>
                   
            </Container>
        </>
    )
}