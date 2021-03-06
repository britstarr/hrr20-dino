import React from 'react';
import MyRoutinesNav from './my-routines-nav.react.js';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Launch from 'material-ui/svg-icons/action/launch';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';

// flux
import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import RoutineActions from '../../flux/actions/routine-actions';


RoutineStore.useMockData();
TaskStore.useMockData();

export default class MyRoutines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routines: [],
      tasks: []
    };
  }

  componentDidMount() {
    this.getRoutineData();
    this.getTaskData();

    RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  componentWillUnmount() {
    RoutineStore.removeChangeListener(this.getRoutineData);
    TaskStore.removeChangeListener(this.getTaskData);
  }

  getRoutineData() {
    RoutineStore
      .get()
      .then((data) => {
        // console.log('in getRoutineData, data = ' + JSON.stringify(data, null, 2));
        // console.log('in getRoutineData, data.collection = ' + JSON.stringify(data.data));
        this.setState({
          routines: data.data
        });
      });
  }

  getTaskData() {
    TaskStore
      .get()
      .then((data) => {
        this.setState({
          tasks: data.data
        });
      });
  }

  findTasksForRoutine(routine) {
    return _.filter(this.state.tasks, (task) => {
      return task.RoutineId === routine.id;
    });
  }

  handleRemoveRoutine(id) {
    RoutineActions.remove(id);
  }

  handleRemoveTask(id) {
    TaskActions.remove(id);
  }

  render() {
    const paperStyle = {
      float: 'left',
      height: 400,
      width: 300,
      margin: 30,
      overflow: 'auto'
    };

    return (
      <div>
        <MyRoutinesNav />
        {this.state.routines.map((routine) => {
          return (
            <Paper key={routine.id} style={paperStyle} zDepth={4}>
              {/* insert onTapTouch for FlatButton */}
              <AppBar
                title={routine.name}
                titleStyle={{fontSize: 18}}
                iconElementLeft={ <IconButton onClick={this.handleRemoveRoutine.bind(this, routine.id)}>
                                    <NavigationClose />
                                  </IconButton> }
                iconElementRight={ <Link to={{ pathname:`/routines/${routine.name}`, state: {name: routine.name} }}><IconButton><Launch /></IconButton></Link> }
              />
              <List>

                {/*for each task in routine */}
                {this.findTasksForRoutine(routine).map((task) => {
                  return (
                    <div key={task.id}>
                      <Divider />
                      {/* insert onTapTouch for ListItem */}
                      <ListItem
                        primaryText={task.name}
                        secondaryText={task.description}
                        rightIcon={ <Link to={{pathname:`/tasks/${task.name}`, state:{name: routine.name} }} ><Launch /></Link>}
                      >
                      </ListItem>

                    </div>


                  );
                })}
              </List>
            </Paper>
          );
        })}
      </div>
    );
  }
}
