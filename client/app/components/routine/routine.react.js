import React from 'react';
import RoutineNav from './routine-nav.react.js';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';

// flux
import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import RoutineActions from '../../flux/actions/routine-actions';
import TaskActions from '../../flux/actions/task-actions';




export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
      RoutineId: undefined,
      description: '',
      tasks: [],
      newTask:'',
      newTaskDescription: ''
    };
  }

  componentDidMount() {
    this.getRoutineData();
    // this.getTaskData();

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
        }, this.getThisRoutine);
      });
  }

  getThisRoutine() {
    // console.log(this.state.routines);
    var routine = _.filter(this.state.routines, (item) =>
      item.name === this.props.params.id
    )
    // console.log('THIS IS ROUTINE!!!!! ', routine);
    this.setState({
      description: routine[0].description,
      RoutineId: routine[0].id
    }, this.getTaskData);
  }


//////// copied from my-routines, add efficiency later
  getTaskData() {
    console.log('this state', this.state.RoutineId)
    TaskStore.data.currentRoutine = this.state.RoutineId;
    TaskStore
      .get()
      .then((data) => {
        console.log('in getTaskData, data.data = ' + JSON.stringify(data.data, null, 2));

        var allTasks = data.data;
        var routineTasks = [];

        allTasks.forEach(function(val){
          if (val.RoutineId === TaskStore.data.currentRoutine) {
            routineTasks.push(val);
          }
        })
        this.setState({
          tasks: routineTasks
        });
      })
      .then(() => {
        console.log('invoked, getTaskData in routine.react, this.state.tasks now: ', this.state.tasks);
      });
  }

  findTasksForRoutine(routine) {
    return _.filter(this.state.tasks, (task) => {
      return task.RoutineId === routine.id;
    });
  }
////////////// End of copy-pasta ///////////

  handleChange(fieldName, event) {
    this.setState({
      [fieldName]: event.target.value
    });
  }

  handleSubmit() {
    console.log('in routine.react, RoutineId before sumbit = ', this.state.RoutineId)
    TaskActions.add({
      name: this.state.newTask,
      description: this.state.newTaskDescription,
      RoutineId: this.state.RoutineId
    })

    this.setState({
      newTask: '',
      newTaskDescription: ''
    }, () => console.log('invoked setState in add, newTask state currently: ' + this.state.newTask));
  }

  handleRemoveTask(id) {
    TaskActions.remove(id);
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
                {/* display Routine Name within primaryText */}
                {/* display routine description inside secondaryText */}
                <ListItem
                  primaryText={this.props.params.id}
                  secondaryText={this.state.description}
                />
              </List>
              <Divider />

              <List>
                {/* for each task in routine */}
                {/* add specific task name within primaryText */}
                {this.state.tasks.map((task, i) => {
                  return (<ListItem
                  primaryText={task.name}
                  secondaryText={task.description}
                  key={i}
                  leftCheckbox={<Checkbox />}
                  rightIconButton={ <IconButton onClick={this.handleRemoveTask.bind(this, task.id)}>
                            <NavigationClose />
                            </IconButton> }
                  />)
                })}
              </List>
              <Divider />
              <TextField
                onChange={this.handleChange.bind(this, 'newTask')}
                value={this.state.newTask}
                hintText='Wash Hands First!'
                floatingLabelText='Add a new task!'
                rows={2}
                fullWidth={true}
              />
              <TextField
                onChange={this.handleChange.bind(this, 'newTaskDescription')}
                value={this.state.newTaskDescription}
                hintText='Be clean!'
                floatingLabelText='Add a new task Description!'
                rows={2}
                fullWidth={true}
              />
            <RaisedButton
              label='Add Task!'
              labelPosition='after'
              icon={<AddCircleOutline />}
              onClick={this.handleSubmit.bind(this)}
            />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
