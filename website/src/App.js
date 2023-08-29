import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AboutBook from './pages/AboutBook';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import SendBook from './pages/SendBook.js';
import Contact from './pages/Contact';
import YourUploads from './pages/YourUploads.js';
import Donations from './pages/Donations.js';
import SaveUser from './pages/SaveUser';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function App() {

  return (
    <Switch>
      <Route component={AboutBook} path="/book" />
      <Route component={Donations} path="/donations" />
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Route component={Contact} path="/contact" />
      <Route component={SendBook} key={3} path="/sendbook" />
      <Route component={YourUploads} path="/uploads" />
      <Route component={SaveUser} path="/saveuser/:token" />
      <Route path="/:term" key={2} component={Home} />
      <Route path="/" key={1} component={Home} />
    </Switch>
  );
}
