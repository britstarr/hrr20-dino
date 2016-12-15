import React from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  function getInitialState() {
    return {
        emailValue: '',
        passwordValue: ''
    }
  }

  function handleTextFieldChange(e) {
    this.setState({
      emailValue: e.target.value,
      passwordValue: e.target.value
    });
  }

  render() {
    console.log('Log In');
    return (
      <div>
          <TextField value={this.state.emailValue} onChange={this._handleTextFieldChange} />
          <TextField value={this.state.passwordValue} onChange={this._handleTextFieldChange} />
      </div>
    );
  }
}