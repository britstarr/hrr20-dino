import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('Log In');
    return (
      <div>
        <RaisedButton label="Log In" />
      </div>
    );
  }
}