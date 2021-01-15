import { makeStyles } from '@material-ui/core/styles';


const linkContainer = makeStyles({
    root:{
        display:'flex',
        justifyContent:'space-around',
    }
});

const appTitle = makeStyles(theme => ({
    h2:{
        fontFamily:'Lobster',
        fontStyle:'oblique',
        display:'block ruby',
        [theme.breakpoints.down('sm')]:{
            fontSize:'1.1rem',
        },
    }
}));
const menuLink = makeStyles(theme => ({
    h6:{
        color:'white',
        '&:hover':{
            transition: 'font-size 1s ease-out',
            fontSize: '1.5rem'
        },
        [theme.breakpoints.down("sm")] :{
            fontSize: '0.9rem',
            '&:hover':{
                transition: 'font-size 1s ease-out',
                fontSize: '1.1rem'
            },
        }
    }

}));

export {linkContainer, appTitle, menuLink}