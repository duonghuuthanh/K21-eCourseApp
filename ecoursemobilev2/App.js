import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Course from "./components/Course/Course";
import Lesson from "./components/Course/Lesson";
import LessonDetails from "./components/Course/LessonDetails";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Lesson" component={Lesson} />
      <Stack.Screen name="LessonDetails" component={LessonDetails} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;