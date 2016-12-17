import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import UserActions from '../../flux/actions/user-actions';
import { Link } from 'react-router';


export default class Signup extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      username: null,
      password: null,
      password2: null
    }

  }

  handleChange(fieldName, event) {
    this.setState({
      [fieldName]: event.target.value
    });
  }

  handleSubmit() {
    console.log('handleSubmit invoked in signup.react, state being passed to User Actions: ' + JSON.stringify(this.state));

    UserActions.add({
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2 
    });
  }

  render() {

    const style = {
      marginLeft: 20,
    };

    return (
    <div>
      <Paper zDepth={2}>
         <AppBar
            title="Sign Up"
          />
        <TextField hintText="Username" style={style} underlineShow={false} onChange={this.handleChange.bind(this, 'username')}/>
        <Divider />
        <TextField hintText="Password" style={style} underlineShow={false} onChange={this.handleChange.bind(this, 'password')}/>
        <Divider />
        <TextField hintText="Repeat Password" style={style} underlineShow={false} onChange={this.handleChange.bind(this, 'password2')}/>
        <Divider />
        <Link to='/'>
         <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit.bind(this)}/>
        </Link>
      </Paper>
    </div>  
    );
  }
}