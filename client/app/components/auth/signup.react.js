import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      console.log('Singup');
    return (
      <div>
        <RaisedButton label="Sign Up" />
      </div>
    );
  }
}
