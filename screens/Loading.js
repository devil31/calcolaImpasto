import React from 'react'
import { View, Text,ActivityIndicator } from 'react-native'

const Loading = () => {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Loading...</Text>
            <ActivityIndicator size={'large'} color={'black'}/>
        </View>
    )
}

export default Loading
