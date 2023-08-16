import React, {createContext, useContext, useEffect} from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import {} from '@react-navigation/native';

import AuthRoutes from "./Auth.Routes";
import AppRoutes from "./App.Routes";
import { AuthContext } from "../Context/Auth";

function Routes(){

    const { signed } = useContext(AuthContext)

    const loading = false;

    if(loading){
        return(
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#36393f'}}>
                <ActivityIndicator size={50} color="#e52246"/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;