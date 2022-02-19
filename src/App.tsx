import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NewPoop from './pages/NewPoop';
import About from './pages/About';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/poops" component={NewPoop} />
                <Route exact path="/poops/view" component={NewPoop} />
                <Route exact path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
