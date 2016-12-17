import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UserActions from '../../flux/actions/user-actions';
import { Link } from 'react-router';

export default class Signup extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      password2: null,
      error_message: null
    }
    
  }

  handleChange(fieldName, event) {
    if(event.target.value)
    this.setState({
      [fieldName]: event.target.value
    });
  }

  handleSubmit() {
    console.log('handleSubmit invoked in signup.react, state being passed to User Actions: ' + JSON.stringify(this.state));
    
    if(this.state.password !== this.state.password2) {
        this.state.error_message = 'Passwords do not match.'; 
      return;
    } else if(!this.state.password && !this.state.password2 && !this.state.username) {
        this.state.error_message = 'Fill in the fields';
      return;
    }

    UserActions.add({
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2 
    });
  }

  render() {

    const styles = {
      style: {
        marginLeft: 20
      },
      card: {
        width: '350px',
        color: 'black'
      },
       button: {
        marginTop: '50px',
        marginLeft: '20px',
        marginBottom: '20px'
       } 
    };

    return (
      <div className="container">
        <Card style={styles.card} containerStyle={{width: 300}}>
         <CardTitle title="Sign Up"/>
        <form>
           {/*<AppBar title="Sign Up"/>*/}
          <TextField floatingLabelText="email" hintText="john.doe@gmail.com" style={styles.style} underlineShow={false} errorText={this.state.error_message}  onChange={this.handleChange.bind(this, 'username')}/>
          <Divider/>
          <TextField floatingLabelText="Password" hintText="Password" style={styles.style}  underlineShow={false}  onChange={this.handleChange.bind(this, 'password')}/>
          <Divider/>
          <TextField floatingLabelText="Repeat password" style={styles.style} hintText="Repeat Password"  underlineShow={false}  onChange={this.handleChange.bind(this, 'password2')}/>
          <Divider/>
          <div className="button-line">
            <Link to='/login'>
             <RaisedButton label="Sign Up" primary={true} style={styles.button} onClick={this.handleSubmit.bind(this)}/>
            </Link>
          </div>
        </form>
        </Card>
      </div>  
    );
  }
}


