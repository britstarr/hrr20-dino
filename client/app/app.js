import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application/application.react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();


ReactDOM.render(


      <Application />


  ,
  document.getElementById('app-container')
);
