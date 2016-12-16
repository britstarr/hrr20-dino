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

// flux
import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import RoutineActions from '../../flux/actions/routine-actions';


export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
      description: ''
    };
  }

  componentDidMount() {
    this.getRoutineData();
    console.log('==========> ==========> ==========> ==========>');

  }

  getRoutineData() {
    RoutineStore
      .get()
      .then((data) => {
        // console.log('in getRoutineData, data = ' + JSON.stringify(data, null, 2));
        // console.log('in getRoutineData, data.collection = ' + JSON.stringify(data.data));
        this.setState({
          routines: data.data
        }, this.getThisRoutine);
      });
  }

  getThisRoutine() {
    console.log(this.state.routines);
    var routine = _.filter(this.state.routines, (item) =>
      item.name === this.props.params.id
    )
    console.log('THIS IS ROUTINE!!!!! ', routine);
    this.setState({
      description: routine[0].description
    });
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
                  secondaryText={this.state.description}
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
