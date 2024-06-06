/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import UserProfile from './components/UserProfile';
import Camera from './components/Camera';
import Pagamentos from './components/Pagamentos';
import Planos from './components/Planos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
      <Tab.Navigator tabBarOptions={{activeTintColor: '#ff6a06',inactiveTintColor: '#231F20'}}>
      <Tab.Screen name="Perfil" component={UserProfile} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Pagamentos" component={Pagamentos} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={UserProfile} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Planos" component={Planos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
