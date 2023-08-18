import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from 'react-native-vector-icons/Feather';

import Home from "../Pages/Home/indes";
import Profile from "../Pages/Profile";
import Search from "../Pages/Search";
import NewPost from "../Pages/Newpost";
import PostsUser from "../Pages/PostsUser";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen
            name="NewPost"
            component={NewPost}
            options={{
                title: 'Novo Post',
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor: "#36393f"
                }
            }}
            />

            <Stack.Screen
            name="PostsUser"
            component={PostsUser}
            options={{
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: "#36393f"
                }
            }}
            />
        </Stack.Navigator>
    )
}

function AppRoutes(){
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#fff",
            tabBarStyle:{
                backgroundColor: "#202225",
                borderTopWidth: 0
            }
        }}
        >
            <Tab.Screen name="HomeTab" component={StackRoutes} 
            options={{
                tabBarIcon: ({color, size}) => {return(<Feather name="home" color={color} size={size}/>)}
            }}
            />

            <Tab.Screen name="Search" component={Search} 
            options={{
                tabBarIcon: ({color, size}) => {return(<Feather name="search" color={color} size={size}/>)}
            }}            
            />

            <Tab.Screen name="Profile" component={Profile} 
            options={{
                tabBarIcon: ({color, size}) => {return(<Feather name="user" color={color} size={size}/>)}
            }}            
            />

        </Tab.Navigator>
    )
}

export default AppRoutes;
