import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/auth/register" component={RegisterPage} />
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
