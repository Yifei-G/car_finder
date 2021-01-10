import {BrowserRouter} from "react-router-dom"
import './App.css';
import CarList from './Components/CarList.js';



function App() {
  return (
    <>
    <BrowserRouter>
      <CarList />
    </BrowserRouter>
  </>
  );
}

export default App;
