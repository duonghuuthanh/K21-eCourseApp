import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Icon } from 'react-native-paper';

import Course from './components/Course/Course';
import Lesson from './components/Course/Lesson';
import LessonDetails from './components/Course/LessonDetails';
import Login from './components/User/Login';
import Register from './components/User/Register';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Course' component={Course} options={{title: 'Khóa học'}} />
      <Stack.Screen name='Lesson' component={Lesson} options={{title: 'Bài học'}} />
      <Stack.Screen name='LessonDetails' component={LessonDetails} options={{title: 'Chi tiết bài học'}} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={MyStack} options={{title: "Ứng dụng", tabBarIcon: () => <Icon color='blue' size={30} source="home" />}} />
      <Tab.Screen name='Register' component={Register} options={{title: "Đăng ký",tabBarIcon: () => <Icon color='blue' size={30} source="account" />}} />
      <Tab.Screen name='Login' component={Login} options={{title: "Đăng nhập",tabBarIcon: () => <Icon color='blue' size={30} source="login" />}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}
