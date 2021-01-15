import { makeStyles } from '@material-ui/core/styles';
    const carContiner = makeStyles({
        root:{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:'center',
        }
    });

    const carCardStyle = makeStyles({
        root:{
            marginBottom:"1em",
            marginRight:"1em",
            borderColor:"blue",
        },
        h4:{
            fontFamily:'lobster',
            margin:'1rem 0'
        },
        h5:{
            fontFamily:'lobster',
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