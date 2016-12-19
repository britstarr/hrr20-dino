import React from 'react';
import CreateTaskNav from './create-task-nav.react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';

import axios from 'axios';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationClose from 'material-ui/svg-icons/navigation/close';



// flux
import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import RoutineActions from '../../flux/actions/routine-actions';
import TaskActions from '../../flux/actions/task-actions';



export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      tasks: [],
      completed: false,
      RoutineId: RoutineStore.data.currentRoutine + 1
      //added plus one due to issue with querying database - it returns the previous routine rather than the current one
    };
  }

  componentDidMount() {
    this.getRoutineData();
    this.getTaskData();

    // RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  componentWillUnmount() {
    // RoutineStore.removeChangeListener(this.getRoutineData);
    TaskStore.removeChangeListener(this.getTaskData);
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

  findTasksForRoutine() {
    return _.filter(this.state.tasks, (task) => {
      return task.RoutineId === this.state.RoutineId;
    });
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
    var latestRoutineId = 1;
    // console.log(this.state.routines);
    var routine = _.forEach(this.state.routines, (routine) => {
      if (routine.id > latestRoutineId) {
        latestRoutineId = routine.id;
      }
    })
    // console.log('THIS IS ROUTINE!!!!! ', routine);
    this.setState({
      RoutineId: latestRoutineId+1,
    }, this.getTaskData);
  }


  handleRemoveTask(id) {
    TaskActions.remove(id);
  }

  ////////////// End of copy-pasta ///////////


  // axios.get('/routines')
  //   .then(function(routines){
  //     console.log("ROUTINES FROM GET", routines)
  //     var max = -1; //start at -1, to account for the first item in the database
  //     routines.data.forEach(function(val){
  //       if (val.id > max) {
  //         max = val.id
  //         console.log('currently at max', max, val.id)
  //       }
  //     })
  //   RoutineStore.data.currentRoutine = max;
  //   console.log("max ID in query", RoutineStore.data.currentRoutine)
  //   });

  // getRoutineId() {
  //
  //   return new Promise(function (resolve, reject) {
  //     axios.get('/routines')
  //       .then(function(val){
  //         resolve(val)
  //       })
  //       .catch(function(err){
  //         console.log("get routine ID did error", err)
  //       })
  //   });
  // }

  handleChange(fieldName, event) {
    this.setState({
      [fieldName]: event.target.value
    });
  }

  handleSubmit() {
    // var context = this;
    // this.getRoutineId()
    //   .then(function(routines) {
    //     var max = -1; //start at -1, to account for the first item in the database
    //       routines.data.forEach(function(val){
    //         if (val.id > max) {
    //           max = val.id
    //         }
    //       })
    //     RoutineStore.data.currentRoutine = max;
    //     console.log("max ID in query", RoutineStore.data.currentRoutine)
    //
    //     TaskActions
    //       .add({
    //         name: context.state.name,
    //         description: context.state.description,
    //         completed: context.state.completed,
    //         RoutineId: RoutineStore.data.currentRoutine
    //       })
    //   })
    //   .catch(function(err) {
    //     console.log("get routine ID did error", err)
    //   })



    /////////////////// copied in
    console.log('in routine.react, RoutineId before sumbit = ', this.state.RoutineId)
    TaskActions.add({
      name: this.state.name,
      description: this.state.description,
      RoutineId: this.state.RoutineId
    })

    this.setState({
      name: '',
      description: ''
    }, () => console.log('invoked setState in add, newTask state currently: ' + this.state.newTask));
    //////////////////////////// end of copy

  }

  render() {
    const paperStyle = {
      width: 400,
      margin: 20
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const style = {
      margin: 12
    };

    return (
      <div>
        <CreateTaskNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
              {/* inser onChange into text field */}
              <div style={{margin: 20}}>

                <List>
                  {this.findTasksForRoutine().map((task) => {
                    return (<ListItem
                    primaryText={task.name}
                    secondaryText={task.description}
                    key={task.id}
                    leftCheckbox={<Checkbox />}
                    rightIconButton={ <IconButton onClick={this.handleRemoveTask.bind(this, task.id)}>
                              <NavigationClose />
                              </IconButton> }
                    />)
                  })}

                </List>
                <Divider />

                <TextField
                  type="text"
                  hintText="ex. Morning jog for 30 minutes"
                  floatingLabelText="Please Input Task Name"
                  value={this.state.name}
                  fullWidth={true}
                  onChange={this.handleChange.bind(this, 'name')}
                /><br />
                <TextField
                  hintText="ex. My morning jog consisted of 4 minute intervals with 1 minute rest periods along the San Fransisco Bay"
                  floatingLabelText="Please Input Task Description"
                  value={this.state.description}
                  fullWidth={true}
                  multiLine={true}
                  rows={4}
                  onChange={this.handleChange.bind(this, 'description')}
                />
                <div><br />
                <RaisedButton
                  label="Add Task"
                  labelPosition="before"
                  primary={true}
                  icon={<AddCircleOutline />}
                  style={{marginLeft: '32%'}}
                  onClick={this.handleSubmit.bind(this)}
                />
              </div>
              </div>
            </ Paper>
          </div>
        </div>
      </div>

    );
  }
}
