import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from "./app/App";
import Service from "./app/Service";

ReactDOM.render(
  <Game service={Service}/>,
  document.getElementById('root')
);
