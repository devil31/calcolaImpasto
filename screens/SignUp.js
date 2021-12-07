import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { signUp } from '../store/actions/authUser'
import { useDispatch } from 'react-redux';
import Buttons from '../components/Buttons'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const dispatch = useDispatch()

    const onPressSingup = () => {
        !email ? setErrorEmail('inserisci email') : setErrorEmail('');
        !password ? setErrorPassword('inserisci password') : setErrorPassword('');
        dispatch(signUp(email, password))
    }
    return (
        <View style={styles.container}>
            <Image resizeMode={'center'} style={{ width: '120%', height: '40%', marginTop: '10%', bottom: -15 }} source={require('../img/signup.png')} />
            <View style={styles.card}>
                <View style={{ marginTop: 20, marginBottom: 5 }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>CalcolaPizza</Text>
                </View>

                <TextInput keyboardType='email-address' style={styles.input} value={email} onChangeText={value => setEmail(value)} placeholder='email' placeholderTextColor='lightblue' />
                <Text style={{ color: 'red', marginTop:5, textAlign: 'left', width: '75%' }}>{errorEmail}</Text>

                <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={value => setPassword(value)} placeholder='password' placeholderTextColor='lightblue' />
                <Text style={{ color: 'red', marginTop:5, textAlign: 'left', width: '75%' }}>{errorPassword}</Text>

                <View style={{ width: 300, alignItems: 'center', marginTop: 5 }}>
                    <Buttons background='orange' w='50%' color='white' title='Sign Up' onPress={onPressSingup} />
                </View>

                <View style={{ width: 300, alignItems: 'center', marginTop: 10 }}>

                    <View style={{ width: 200, borderWidth: 0.5, marginBottom: 20, marginTop: 15 }}>

                    </View>
                    <View>
                        <Text style={{ color: 'black' }}>hai già un account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <Text style={{ color: 'red', textAlign: 'center', fontSize: 15 }}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>


        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginTop: 20,        
        width: '80%',
        borderRadius: 50,
        paddingLeft: 30,
        paddingBottom: 5,
        borderColor: '#2E86E0',
        height: 45,       
    },
    title: {
        fontSize: 20,
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        backgroundColor: '#2E86E0',

    },
    card: {
        width: '100%',
        alignItems: 'center',
        height: '63%',
        backgroundColor: 'white',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30, 
        },
  
})
