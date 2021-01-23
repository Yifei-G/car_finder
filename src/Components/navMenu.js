import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import {linkContainer,appTitle , menuLink} from '../Style/navMenuStyle.js';


export default function NavMenu(){
    const containerStyle = linkContainer();
    const appTitleStyle = appTitle();
    const linkStyle = menuLink();

    return(
        <>
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Typography variant="h2" className={appTitleStyle.h2}>
                        Car finder
                </Typography>
                <Container className={containerStyle.root}>
                <NavLink to='/about' className='menu-link' activeClassName='menu-link-active'>
                    <Typography variant="h6" className={linkStyle.h6}>
                            About us
                    </Typography>
                </NavLink>

                <NavLink to='/car/all' className='menu-link' activeClassName='menu-link-active'>
                    <Typography variant="h6" className={linkStyle.h6}>
                            All Cars
                    </Typography>
                </NavLink>

                <NavLink to='/car/create' className='menu-link' activeClassName='menu-link-active'>
                    <Typography variant="h6" className={linkStyle.h6}>
                            New Car
                    </Typography>
                </NavLink>

                <NavLink to='/user/me' className='menu-link' activeClassName='menu-link-active'>
                    <Typography variant="h6" className={linkStyle.h6}>
                        My Profile
                    </Typography>
                </NavLink>   
                </Container>
            
            </Toolbar>
        </AppBar>
        </>
        ) 
    }