import {BrowserRouter, Switch, Route} from "react-router-dom"
import './App.css';
import CarList from './Components/CarList.js';
import NavMenu from './Components/NavMenu.js';
import About from './Components/About.js';
import Footer from './Components/Footer.js';
import CarDetails from './Components/CarDetails.js';
import CreateCar from './Components/CreateCar.js';
import Login from './Components/Login.js';
import Profile from './Components/Profile.js';
function App() {
  return (
    <>
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/about">
            <NavMenu />
            <About />
          </Route>
          <Route exact path='/car/all'>
            <NavMenu />
            <CarList />
          </Route>
          <Route exact path='/car/:id/detail'>
            <NavMenu />
            <CarDetails />
          </Route>
          <Route exact path='/car/create'>
            <NavMenu />
            <CreateCar />
          </Route>
          <Route exact path="/user/me">
            <NavMenu />
            <Profile />
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  </>
  );
}

export default App;
