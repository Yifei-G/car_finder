import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {aboutTitle, aboutText} from '../Style/aboutStyle.js';
export default function About(){
    const titleStyle = aboutTitle();
    const textStyle = aboutText();
    return(
        <>
        <Container>
            <Typography variant="h3" className={titleStyle.h3}>
                About this project:
            </Typography>
            <Typography className={textStyle.root} paragraph>
                This is the frontend implementation of
                Car Manager project 
                <Link href="https://github.com/Yifei-G/car_manager" target="_blank" rel="noopener" >
                    (check it here).
                </Link>
                
                This project is made by REACT.js with <Link href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noopener">
                    hooks
                </Link>
                (after version v16.8).
                
            </Typography>

            <Typography className={textStyle.root} paragraph>
            All the web components are based on <Link href='https://material-ui.com/getting-started/installation/' target="_blank" rel="noopener">Material-UI</Link>, a REACT implementation of Google's Material Design Style.
            The Page routing management is based on <Link href='https://reactrouter.com/core/guides/quick-start' target="_blank" rel="noopener">react-router-dom</Link> library.
            </Typography>

            <Typography className={textStyle.root} paragraph>
                You can check the source code of this project in this <Link href='https://github.com/Yifei-G/car_finder' target="_blank" rel="noopener">repository.</Link>
            </Typography>
        </Container>
        </>
    );
}