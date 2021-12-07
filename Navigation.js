

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
import CalculateW from "./screens/CalculateW";
import Home from "./screens/Home";
import Saved from "./screens/Saved";
import Recipe from "./screens/Recipe";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Presentation from "./screens/Presentation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderBtn from "./components/HeaderBtn";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./screens/Loading";
import SignUp from "./screens/SignUp"
import Login from "./screens/Login";
import { retrieveData } from './store/actions/authUser'
import { logout } from "./store/actions/authUser";




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


function Logout(props) {
    const dispatch = useDispatch()
    return (
        <DrawerContentScrollView>
            <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} icon={() => <Ionicons name="home-outline" size={26} color="#2E86E0" />} />
            <DrawerItem label="Calcolo W" onPress={() => props.navigation.navigate('CalculateW')} icon={() => <Ionicons name="calculator-outline" size={26} color="#2E86E0" />} />
            <DrawerItem label="Saved" onPress={() => props.navigation.navigate('Saved')} icon={() => <Ionicons name="save-outline" size={26} color="#2E86E0" />} />
            <DrawerItem label="Logout" onPress={() => dispatch(logout())} inactiveTintColor='red' icon={() => <Ionicons name="log-out-outline" size={26} color="#2E86E0" />} />
        </DrawerContentScrollView>
    )
}


const Navigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <Logout navigation={props.navigation} />} >
            <Drawer.Screen name='Home' component={StackNavigation} options={{
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#2E86E0' },
                headerTintColor: 'white',
                headerShown: false,

            }} />

            <Drawer.Screen name="CalculateW" component={CalculateW} options={{

                headerStyle: { backgroundColor: '#2E86E0' },
                headerTitle: 'Calcolo W',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white' },


            }} />

            <Drawer.Screen name="Saved" component={Saved} options={{

                headerStyle: { backgroundColor: '#2E86E0' },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: { color: 'white' },

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

const AuthNavigation = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name='Login' component={Login} options={{
                headerStyle: { backgroundColor: '#2E86E0' },
                headerBackTitleVisible: false,
                headerShown: false,
                headerTintColor: '#2E86E0',

            }
            } />
            <Stack.Screen name='SignUp' component={SignUp} options={{
                headerStyle: { backgroundColor: '#2E86E0' },
                headerBackTitleVisible: false,
                headerShown: false,
                headerTintColor: '#2E86E0',

            }} />
        </Stack.Navigator>
    )
}

function MainNavigation() {
    const setLaunch = useSelector(state => state.start.Statestart)
    const [loading, setLoading] = useState(true)
    const [firstLaunch, setFirstLaunc] = useState(null)
    const token = useSelector(state => state.authUser.token)
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        dispatch(retrieveData()).then(() => {
            setLoading(false)
        })

    }, [dispatch])




    const storage = async () => {
        const StorageData = await AsyncStorage.getItem('data');
        const a = JSON.parse(StorageData)
        setFirstLaunc(a)
        setLoading(false)
    }


    storage()

    return (
        <NavigationContainer>

            {loading ? <Loading /> : token ?
                firstLaunch == null ? (
                    <StartPresentation />
                ) : (
                    <Navigation />
                ) : <AuthNavigation />}
        </NavigationContainer>
    )

}



export default MainNavigation