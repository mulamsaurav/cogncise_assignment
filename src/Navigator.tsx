// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name='Register' component={Register}/>
       <Stack.Screen name='Login' component={Login}/>
       <Stack.Screen name='Profile' component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;