import { makeStyles } from '@material-ui/core/styles';
    const carContiner = makeStyles({
        root:{
            display:"flex",
            flexWrap:"wrap",
        }
    });

    const carCardStyle = makeStyles({
        root:{
            marginBottom:"1em",
            marginRight:"1em",
            borderColor:"blue",
        },
        h5:{
            fontFamily:'Noto Sans TC',
            fontWeight:"bold",
        },
        h6:{
            fontFamily:'Noto Sans TC',
            fontSize:'1rem'
        },
        title:{
            fontWeight:"bold"
        }
    });

export{carContiner, carCardStyle};