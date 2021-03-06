import React from 'react';
import Landing from './Landing'
import './App.css';
import SimpleMap from './SimpleMap'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Posted from './Posted'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/receiver/" component={SimpleMap} />
        <Route path="/posted" component={Posted}/>
      </Switch>
  </BrowserRouter>
  );
}

export default App;
