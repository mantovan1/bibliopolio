import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Usuario from "./pages/Usuario";

const Routes = () => {
   return(
       <BrowserRouter>
       <Routes>
            <Route component = { Home }  path="/" exact />
            <Route component = { Sobre }  path="/sobre" />
            <Route component = { Usuario }  path="/usuario" />
       </Routes>
       </BrowserRouter>
   )
}

export default Routes;