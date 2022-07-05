import React from 'react';

import { Route, Switch } from "react-router-dom";

import Cadastro from './pages/Cadastro';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sobre from "./pages/Sobre";
import EnviarLivro from './pages/EnviarLivro';
import SeusDownloads from './pages/SeusDownloads';
import SeusUploads from './pages/SeusUploads';

export default function App() {
  return (
    //<Router>
      <Switch>
        <Route component = { Home }  path="/" exact />
        <Route component = { Login }  path="/login" />
        <Route component = { Cadastro }  path="/cadastro" />
        <Route component = { Sobre }  path="/sobre" />
        <Route component= {EnviarLivro} path="/enviar-livro" />
        <Route component= {SeusDownloads} path="/seus-downloads" />
        <Route component={SeusUploads} path={"/seus-uploads"} />
      </Switch>
    //</Router>
  );
}