import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Course from './components/Course/Course';
import Lesson from './components/Course/Lesson';
import LessonDetails from './components/Course/LessonDetails';

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


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
