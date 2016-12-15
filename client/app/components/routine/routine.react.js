import React from 'react';
import RoutineNav from './routine-nav.react.js';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';


export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const paperStyle = {
      height: 600,
      width: 600,
      margin: 20,
      overflow: 'auto'
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const launchTask = (
      <IconButton>
        <Launch />
      </IconButton>
    );

    return (
      <div>
        <RoutineNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>

              <Link to='/'>
                <ArrowBack />
              </Link>

              <List>
                {/* for each task in routine */}
                {/* add specific task name within primaryText */}
                <ListItem
                  primaryText={this.props.params.id}
                  leftCheckbox={<Checkbox />}
                  rightIconButton={launchTask}
                />
              </List>
              <Divider />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
