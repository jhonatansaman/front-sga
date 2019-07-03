import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import HomeAlmoxarifado from './pages/HomeAlmoxarifado';
import Estoque from './pages/Estoque';
import New from './pages/New';

function Router() {
    return (
        <Switch>
            <Route path="/" exact component={Feed} /> 
            <Route path="/home" component={HomeAlmoxarifado} />
            <Route path="/new" component={New} />
            <Route path="/estoque" component={Estoque} />
        </Switch>
    );
}

export default Router;