Skip to content
This repository
Search
Pull requests
Issues
Gist
 @britstarr
 Unwatch 3
  Star 0
 Fork 18 hrr20-alpaca/hrr20-dino
forked from hrr20-dino/hrr20-dino
 Code  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
Branch: master Find file Copy pathhrr20-dino/client/app/components/theme/theme.js
6642984  33 minutes ago
@galaxode galaxode Update themes. Add Calvin, fix Prithvi, update Andrew and Brittany bu…
4 contributors @galaxode @DiogenisPanagiotis @Prithvi-A @britstarr
RawBlameHistory
100 lines (93 sloc)  2.35 KB
'user strict';

import * as Colors from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

// Prithvi Winterfresh
module.exports.prithvi = {
  zIndex: zIndex,
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  AppBar: {
    textColor: Colors.white
  },
  palette: {
    primary1Color: Colors.blue500,
    primary2Color: Colors.blue200,
    primary3Color: Colors.blue300,
    accent1Color: Colors.blue300,
    accent2Color: Colors.blue300,
    accent3Color: Colors.blue300,
    textColor: Colors.teal900,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    pickerHeaderColor: Colors.blue200,
    ToolbarGroup: Colors.blue200,
  }
};

// Brittany
module.exports.brittany = {
  zIndex: zIndex,
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  AppBar: {
    textColor: Colors.black
  },
  palette: {
   primary1Color: '#FF5252',
   primary2Color: Colors.Blue200,
   primary3Color: '#FF5252',
   accent1Color: '#FF5252',
   accent2Color: '#FF5252',
   accent3Color: '#FF5252',
   textColor: Colors.teal900,
   alternateTextColor: Colors.black,
   canvasColor: '#FFF9C4',
   pickerHeaderColor: Colors.Blue200,
   ToolbarGroup: Colors.Blue200,
  }
};

// Calvin

module.exports.calvin = {
 zIndex: zIndex,
 spacing: Spacing,
 fontFamily: 'Roboto, sans-serif',
 AppBar: {
   textColor: Colors.black
 },
 palette: {
   primary1Color: Colors.blueGrey500,
   primary2Color: Colors.lightBlue200,
   primary3Color: Colors.lightBlue300,
   accent1Color: Colors.blueGrey300,
   accent2Color: Colors.blueGrey300,
   accent3Color: Colors.blueGrey300,
   textColor: Colors.teal900,
   alternateTextColor: Colors.white,
   canvasColor: Colors.white,
   pickerHeaderColor: Colors.blueGrey200,
   ToolbarGroup: Colors.blueGrey200,
 }
};

// Andrew
module.exports.andrew = {
  zIndex: zIndex,
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  AppBar: {
    textColor: Colors.black,
    //alternateTextColor: Colors.black,
  },
  palette: {
    primary1Color: '#455A64',
    primary2Color: '#607D8B',
    primary3Color: '#757575',
    accent1Color: Colors.green300,
    accent2Color: Colors.brown500,
    accent3Color: Colors.green300,
    textColor: '#212121',
    alternateTextColor: Colors.white,
    canvasColor: '#BDBDBD',
    pickerHeaderColor: Colors.green200,
    ToolbarGroup: Colors.green200,
  }
};
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help
