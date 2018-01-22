import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Start from '../containers/Start';
import '../styles/main.css';

class App extends React.Component <any, any> {
    render() {
        return (
            <HashRouter>
                <div className='layout-view'>
                    <Switch>
                        <Route path='/' component={Start}/>
                        <Route path='/settings' component={Start}/>
                        <Route path='/*' render={() => <h1>404 Page Not Found</h1>}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export {App};