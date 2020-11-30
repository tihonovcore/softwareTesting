import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from "./app/App";
import Service from "./app/Service";
import BE_Service from "./app/BE_Service";

// express be
// NOTE: use "proxy": "http://localhost:9000"
ReactDOM.render(
  <Game service={Service}/>,
  document.getElementById('root')
);

// spring be
// NOTE: use "proxy": "http://localhost:8080"
// ReactDOM.render(
//   <Game service={BE_Service}/>,
//   document.getElementById('root')
// );
