import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Course from "./components/courses/Course";
import Lesson from "./components/courses/Lesson";
import LessonDetails from "./components/courses/LessonDetails";
import 'moment/locale/vi';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import { Icon } from "react-native-paper";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Lesson" component={Lesson} />
      <Stack.Screen name="LessonDetails" component={LessonDetails} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyStack} options={{title: "Danh mục khóa học", tabBarIcon: () => <Icon source="home" size={30} color="blue" />}} />
      <Tab.Screen name="Register" component={Register} options={{title: "Đăng ký", tabBarIcon: () => <Icon source="account" size={30} color="blue" />}} />
      <Tab.Screen name="Login" component={Login} options={{title: "Đăng nhập", tabBarIcon: () => <Icon source="login" size={30}  color="blue" />}} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}

export default App;