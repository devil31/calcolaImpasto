import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'



const Btn = ({ fnliev, pressed, lv }) => {


    return (
        <View style={styles.container}  >
            <Text style={styles.title}>{lv}</Text>
            <TouchableOpacity onPress={fnliev} >
                <View style={pressed ? styles.cont : styles.cont2} />
            </TouchableOpacity>
        </View>
    )
}

export default Btn

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 10,

    },
    cont: {
        borderWidth: 1,
        borderColor: '#FFBD20',
        width: 40,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#FFBD20',
    },
    cont2: {
        borderWidth: 1,
        width: 40,
        height: 30,
        borderRadius: 100,
        backgroundColor: 'white',
        borderColor: '#FFBD20',

    },
    title: {
        fontWeight: '700',
        fontFamily: 'sans-serif-light'
    }

})
