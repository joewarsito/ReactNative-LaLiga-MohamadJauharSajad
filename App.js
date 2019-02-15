import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Players from './komponen/Players';
import Teams from './komponen/Teams';



var AppNavigator = createStackNavigator(
  {
    ListTeams: Teams,
    ListPlayers: Players
  },
  {
    initialRouteName: "ListTeams"
  }
)

export default createAppContainer(AppNavigator);