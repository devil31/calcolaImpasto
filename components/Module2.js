import React from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const Module2 = ({ title, defValue, input, error, add, remove }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.container__value}>
                <TouchableOpacity onPress={remove} >
                    <Ionicons name='remove-circle' size={28} color={'#2E86E0'} />
                </TouchableOpacity>
                <TextInput style={styles.txtInput} keyboardType="numeric" defaultValue={defValue} onChangeText={input} />
                <TouchableOpacity onPress={add} >
                    <Ionicons name='add-circle' size={28} color={'#2E86E0'} />
                </TouchableOpacity>

            </View>
            <Text style={styles.error}>{error}</Text>


        </View>
    )
}


export default Module2;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        minWidth: 110


    },
    container__value: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',


    },
    txtInput: {
        borderWidth: 1.5,
        borderColor: '#2E86E0',
        borderRadius: 5,
        minWidth: 90,
        height: 40,
        textAlign: 'center',
        fontWeight: '700',

    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#242628',
        fontFamily: 'sans-serif-light',
    },
    error: {
        color: 'red',
        fontSize: 9,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 5,

    },

})