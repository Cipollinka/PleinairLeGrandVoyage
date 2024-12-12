import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';

import CreateAccount from '@/screens/CreateAccount';
import MainMenu from '@/screens/MainMenu';
import Game from '@/screens/Game';
import PickGame from '@/screens/PickGame';
import Catalog from '@/screens/Catalog';
import PlanningTrip from '@/screens/PlanningTrip';
import Dairy from '@/screens/Dairy';
import ArticleList from '@/screens/ArticleList';
import Settings from '@/screens/Settings';
import ArticleDetails from '@/screens/ArticleDetails';
import Quiz from '@/screens/Quiz';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.CREATE_ACCOUNT}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.CREATE_ACCOUNT} component={CreateAccount} />
        <Stack.Screen name={Screens.MAIN_MENU} component={MainMenu} />
        <Stack.Screen name={Screens.BACKPACK} component={Game} />
        <Stack.Screen name={Screens.PICK_GAME} component={PickGame} />
        <Stack.Screen name={Screens.GAME} component={Game} />
        <Stack.Screen name={Screens.ARTICLE} component={ArticleList} />
        <Stack.Screen
          name={Screens.ARTICLE_DETAILS}
          component={ArticleDetails}
        />
        <Stack.Screen name={Screens.SETTINGS} component={Settings} />

        <Stack.Screen name={Screens.CATALOG} component={Catalog} />
        <Stack.Screen name={Screens.PLANNING_TRIP} component={PlanningTrip} />
        <Stack.Screen name={Screens.DAIRY} component={Dairy} />
        <Stack.Screen name={Screens.QUIZ} component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
