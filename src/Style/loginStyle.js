import { makeStyles } from '@material-ui/core/styles';

const parentContainer = makeStyles({
    root:{
        height:'80vh',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
    }
})

const loginContainer = makeStyles({
    root:{
        border:'1px solid black',
        borderRadius:'10px',
        padding:'4rem 2rem',
    }
});

const loginTitle = makeStyles({
    h5:{
        textAlign:'center'
    }
})

export {parentContainer, loginContainer, loginTitle}