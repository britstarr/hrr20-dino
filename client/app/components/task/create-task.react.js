import React from 'react';
import CreateTaskNav from './create-task-nav.react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import TaskActions from '../../flux/actions/task-actions';
import axios from 'axios';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      completed: false,
      RoutineId: RoutineStore.data.currentRoutine + 1
      //added plus one due to issue with querying database - it returns the previous routine rather than the current one
    };
  }

  componentDidMount() {
    this.getRoutineId()
  }

  getRoutineId() {
    axios.get('/routines')
      .then(function(routines){
        console.log("ROUTINES FROM GET", routines)
        var max = -1; //start at -1, to account for the first item in the database
        routines.data.forEach(function(val){
          if (val.id > max) {
            max = val.id
            console.log('currently at max', max, val.id)
          }
        })
      RoutineStore.data.currentRoutine = max;
      console.log("max ID in query", RoutineStore.data.currentRoutine)
      });
  }

  handleChange(fieldName, event) {
    this.setState({
      [fieldName]: event.target.value
    });
  }

  handleSubmit() {
    TaskActions
      .add({
        name: this.state.name,
        description: this.state.description,
        completed: this.state.completed,
        RoutineId: this.state.RoutineId
      })
  }

  render() {
    const paperStyle = {
      height: 300,
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
                <TextField
                  type="text"
                  hintText="ex. Morning jog for 30 minutes"
                  floatingLabelText="Please Input Task Name"
                  fullWidth={true}
                  onChange={this.handleChange.bind(this, 'name')}
                /><br />
                <TextField
                  hintText="ex. My morning jog consisted of 4 minute intervals with 1 minute rest periods along the San Fransisco Bay"
                  floatingLabelText="Please Input Task Description"
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
