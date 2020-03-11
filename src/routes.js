import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/Main';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import FindUser from './pages/FindUser';
import AddUser from './pages/AddUser';
import AddUserAddress from './pages/AddUserAddress';
import EditAddress from './pages/EditAddress';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/find" exact component={FindUser} />
                <Route path="/users/new" exact component={AddUser} />
                <Route path="/users/:user_id/edit" exact component={EditUser} />
                <Route path="/users/:user_id/address/new" exact component={AddUserAddress} />
                <Route path="/address/:address_id/edit" exact component={EditAddress} />
            </Switch>
        </BrowserRouter>
    );
}
