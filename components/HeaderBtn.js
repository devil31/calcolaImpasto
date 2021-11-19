import React from 'react'
import { View, Text } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const HeaderBtn = (props) => {
    return (
 <Ionicons name="md-menu" size={26} onPress={props.onPressLeft} color={'white'}/>
    )
}

export default HeaderBtn
