import React from 'react';
import {AppRegistry, Text} from 'react-native';
import {name as appName} from './app.json';
import AppManager from '@/AppManager';

function App(): React.JSX.Element {
  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.style = {fontFamily: 'LexendDeca-Regular'};

  return <AppManager/>;
}
AppRegistry.registerComponent(appName, () => App);

export default App;
