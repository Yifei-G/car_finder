import {BrowserRouter, Switch, Route} from "react-router-dom"
import './App.css';
import CarList from './Components/CarList.js';
import NavMenu from './Components/NavMenu.js';
import About from './Components/About.js';
import Footer from './Components/Footer.js';
function App() {
  return (
    <>
    <BrowserRouter>
      <NavMenu />
      <main>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path='/car/all'>
            <CarList />
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  </>
  );
}

export default App;
