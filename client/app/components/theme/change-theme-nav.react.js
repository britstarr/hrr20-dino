import React from 'react';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Reorder from 'material-ui/svg-icons/action/reorder';
import * as Colors from 'material-ui/styles/colors';
import { Link } from 'react-router';


export default class ChangeThemeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const logoStyle = {
      fontWeight: 'bold',
      fontSize: 24,
      color: Colors.white

    };
    const titleStyle = {
      fontSize: 24,
      color: Colors.white,
      margin: '15px'
    };
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            {/* We want this to be a drop-down menu, but using a Link to re-route to theme page for now */}

            <Link to='/themes'>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem
                primaryText="Change Theme"
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem primaryText="Dark Base Theme" />,
                  <MenuItem primaryText="Light Base Thee" />,
                  <Divider />,
                  <MenuItem primaryText="Prithvi's Winterfresh" />,
                  <MenuItem primaryText="Brit's <MYSTERY!>" />,
                  <MenuItem primaryText="Cal's <MYSTERY!>" />,
                  <MenuItem primaryText="Andrew's <MYSTERY!>" />,
                ]}
              />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
            </IconMenu>
            </Link>

            <Link to='/'>
              <ToolbarTitle style={logoStyle} text="DinoTask" />
            </Link>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <div style={titleStyle}>Theme Options</div>
            <Link to='/create-routine'>
              <RaisedButton
                label="Create routine"
                labelPosition="before"
                primary={true}
                icon={<AddCircleOutline />}
              />
            </Link>
            <ToolbarSeparator />
            {/* insert onClick/onTapTouch to RaisedButton */}
            <RaisedButton
              label="Logout"
              labelPosition="before"
              primary={true}
              icon={<PowerSettingsNew />}
              />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
