import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Users from "./src/screens/Users";
import LandingPage from "./src/screens/LandingPage"
import AddList from "./src/screens/AddList"
import AddCategory from "./src/screens/AddCategory"
import ListToDo from "./src/screens/ListToDo"
import DetailList from "./src/screens/DetailList"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab () {
    return(
        <Tab.Navigator
            screenOptions={({route}) =>({
                headerShown:false,

                tabBarIcon: ({focused}) =>{
                    let iconName

                    if(route.name == 'ListToDo'){
                        iconName = focused ? 'journal' : 'journal-outline'
                    } else if(route.name == 'AddList'){
                        iconName = focused ? 'list' : 'list-outline'
                    } else if(route.name == 'AddCategory'){
                        iconName = focused ? 'bookmarks' : 'bookmarks-outline'
                    }

                    return <Ionicons name={iconName} size={20} color='red' />
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'grey'
            })
        }
        >
            <Tab.Screen name='ListTodo' component={ListToDo}/>
            <Tab.Screen name='AddList' component={AddList}/>
            <Tab.Screen name='AddCategory' component={AddCategory}/>
        </Tab.Navigator>
    )
}

export default function Container(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown: false}} />
                <Stack.Screen name="DetailList" component={DetailList} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
                <Stack.Screen
                name="Users"
                component={MyTab}
                options={{
                    headerShown: false,
                    headerTintColor:'white',
                    headerMode: 'screen',
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}