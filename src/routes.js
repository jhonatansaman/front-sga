import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import HomeAlmoxarifado from './pages/HomeAlmoxarifado';
import Relatorio from './pages/Relatorio';
import Estoque from './pages/Estoque';
import New from './pages/New';
import Retirada from './pages/Retirada';
import UsuariosAdd from './pages/UsuariosAdd';
import GerarPdf from './pages/GerarPdf';
// import pdf from './pages/Pdf';

function Router() {
    return (
        <Switch>
            <Route path="/" exact component={Feed} /> 
            <Route path="/home" component={HomeAlmoxarifado} />
            <Route path="/new" component={New} />
            <Route path="/estoque" component={Estoque} />
            <Route path="/retirada" component={Retirada} />
            <Route path="/relatorio" component={Relatorio} />
            <Route path="/addUser" component={UsuariosAdd} />
            {/* <Route path="/gerarPdf" component={GerarPdf} /> */}
            {/* <Route path="/pdf" component={pdf} /> */}
        </Switch>
    );
}

export default Router;