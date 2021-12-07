import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'

const Button = ({title,w,background,color,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            width:w,
            backgroundColor:background,
            justifyContent:'center',
            alignItems:'center',
            padding:5,
            borderRadius:5,
            marginTop:20,
           
                    
            }}>
            <Text style={{
                color:color
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button


