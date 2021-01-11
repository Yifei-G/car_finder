import { makeStyles } from '@material-ui/core/styles';


const footerContainer = makeStyles(theme => ({
    root:{
        margin:'0',
        padding:'1rem',
        backgroundColor: '#3f51b5',
        position:'absolute',
        right:'0',
        bottom:'0',
        left:'0',
        
    }
}))

const footerText = makeStyles({
    root:{
        fontFamily: 'lobster',
        color:'white',
    },
    h5:{
        fontFamily: 'Noto Sans TC',
        fontStyle:'oblique',
        color:'white'
    }
})

export{footerContainer, footerText}