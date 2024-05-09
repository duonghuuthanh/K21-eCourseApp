import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Course from "./components/courses/Course";
import Lesson from "./components/courses/Lesson";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Course} />
      <Stack.Screen name="Lesson" component={Lesson} />
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