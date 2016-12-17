import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UserActions from '../../flux/actions/user-actions';
import { Link } from 'react-router';


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
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
    console.log('handleSubmit invoked in login.react, state being passed to User Actions: ' + JSON.stringify(this.state));

    if(!this.state.password && !this.state.username) {
        this.state.error_message = 'Fill in the fields';
      return;
    }
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

    console.log('Log In');
    return (  
    
      <div className="container">
          <Card style={styles.card} containerStyle={{width: 300}}>
           <CardTitle title="Log In"/>
          <form>
            <TextField floatingLabelText="Username" hintText="john.doe@gmail.com" style={styles.style} underlineShow={false} errorText={this.state.error_message}  onChange={this.handleChange.bind(this, 'username')}/>
            <Divider/>
            <TextField floatingLabelText="Password" hintText="Password" style={styles.style}  underlineShow={false}  onChange={this.handleChange.bind(this, 'password')}/>
            <Divider/>
            <Divider/>
            <div className="button-line">
            <Link to='/routines'>
               <RaisedButton label="Log In" primary={true} style={styles.button} onClick={this.handleSubmit.bind(this)}/>
            </Link>
            </div>
          </form>
          </Card>
      </div> 

    );
  }
}