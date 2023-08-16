import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../Pages/Home/indes";
import Profile from "../Pages/Profile";
import Search from "../Pages/Search";
//import NewPost from "../Pages/Newpost";
//import PostsUser from "../Pages/PostsUser";

const Tab = createBottomTabNavigator()

function AppRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default AppRoutes;