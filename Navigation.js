

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons'; 
import CalculateW from "./screens/CalculateW";
import Home from "./screens/Home";
import Saved from "./screens/Saved";
import Recipe from "./screens/Recipe";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Presentation from "./screens/Presentation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderBtn from "./components/HeaderBtn";
import { useSelector } from "react-redux";
import Loading from "./screens/Loading";



const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const StackNavigation = ({ navigation }) => {

    return (

        <Stack.Navigator  >
            <Stack.Screen name="Calcola Impasto" component={Home} options={{
                headerStyle: { backgroundColor: '#2E86E0' },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white' },
                headerLeft: () => <HeaderBtn onPressLeft={() => navigation.toggleDrawer()} />
            }} />
            <Stack.Screen name="Recipe" component={Recipe} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                headerStyle: { backgroundColor: '#2E86E0' },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white' },


            }} />
        </Stack.Navigator>
    )
}



const Navigation = () => {

    return (


        <Drawer.Navigator >

            <Drawer.Screen name='Home' component={StackNavigation} options={{
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#2E86E0' },
                headerTintColor: 'white',
                headerShown: false,
                drawerIcon:()=>(
                    <Ionicons name="home-outline" size={24} color="#2E86E0"/>
                )

            }} />

            <Drawer.Screen name="Calcolo W" component={CalculateW} options={{

                headerStyle: { backgroundColor: '#2E86E0' },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white' },
                drawerIcon:()=>(
                    <Ionicons name="calculator-outline" size={24} color="#2E86E0"/>
                )

            }} />

            <Drawer.Screen name="Saved" component={Saved} options={{

                headerStyle: { backgroundColor: '#2E86E0' },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white' },
                drawerIcon:()=>(
                    <Ionicons name="save-outline" size={24} color="#2E86E0"/>
                )

            }} />
        </Drawer.Navigator>
    )

}


const StartPresentation = () => {    
    return (
        <Stack.Navigator>
            <Stack.Screen name="presentation" component={Presentation} options={{
                headerShown: false
            }} />
        </Stack.Navigator>

    )
}

function MainNavigation() {
    const setLaunch = useSelector(state => state.start.Statestart)
    const [loading, setLoading] = useState(true)
    const [firstLaunch, setFirstLaunc] = useState(null)


    const storage = async () => {
        
        const StorageData = await AsyncStorage.getItem('data');
        const a = JSON.parse(StorageData)
        setFirstLaunc(a)      
        setLoading(false)
    }

    storage()

    return (
        <NavigationContainer>
            {loading ?
            <Loading/> : firstLaunch == null ? (
                <StartPresentation />
            ) : (
                <Navigation />
            )}

        </NavigationContainer>
    )

}



export default MainNavigation