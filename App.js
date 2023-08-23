import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from "./src/Routes";
import AuthProvider from "./src/Context/Auth";

export default function App(){
    return(
        <NavigationContainer>
            <AuthProvider>
                <StatusBar barStyle={"light-content"} backgroundColor="#36393f" translucent={false}/>
                <Routes/>
            </AuthProvider>
        </NavigationContainer>
    )
}