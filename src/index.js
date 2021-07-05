import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router,Route ,Switch} from "react-router-dom";
import Tablepage from "./Tablepage";

ReactDOM.render(
  <React.StrictMode>
   <Router>
     <Switch>
       <Route exact path="/" component={App} />
       <Route path="/table" component={Tablepage} />
     </Switch>
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals