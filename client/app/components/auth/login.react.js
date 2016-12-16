import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const style = {
      marginLeft: 20,
    };
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };

    console.log('Log In');
    return (
    <div>
      <Paper zDepth={2}>
         <AppBar
            title={<span style={styles.title}>Log In</span>}
          />
        <Divider />
        <TextField hintText="Username" style={style} underlineShow={false} />
        <Divider />
        <TextField hintText="Password" style={style} underlineShow={false} />
        <Divider />
         <RaisedButton label="Submit" primary={true} style={style} />
      </Paper>
    </div>  
    );
  }
}