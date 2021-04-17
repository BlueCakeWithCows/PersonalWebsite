import React from 'react';


import './App.css';
import {Home} from "./pages/Home";
import {OtherSites} from "./pages/OtherSites";
import {Route, Switch} from 'react-router-dom';
import {Resume} from "./pages/Resume";
import {URM} from "./pages/URM";

function App() {
    return (
        <div>
            <Switch>
                <Route path='/other-sites' component={OtherSites}/>
                <Route path='/resume' component={Resume}/>
                <Route path='/urm' component={URM}/>
                <Route path='/' component={Home}/>
            </Switch>
        </div>
    );
}

export default App;
