import { makeStyles } from '@material-ui/core/styles';

const aboutTitle = makeStyles({
    h3:{
        fontFamily:'Noto Sans TC',
        margin:'1rem 0',
    }
});

const aboutText = makeStyles({
    root:{
        fontSize:'1.5rem',
    }
})


export{aboutTitle, aboutText}