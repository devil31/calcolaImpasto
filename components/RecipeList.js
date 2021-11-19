import React from 'react'
import { View, Text , StyleSheet} from 'react-native'

const RecipeList = ({title,value,misure}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}{misure}</Text>
        </View>
    )
}

export default RecipeList

const styles = StyleSheet.create({
    container:{
        borderWidth:1.5,
        borderColor: 'darkgrey',
        width:'80%',
        height:60,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        borderRadius:10,
       
        
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        fontFamily:'sans-serif-light',
        color:'black'
      
    },
    value:{
        fontFamily:'sans-serif-light',
       fontSize:15,
       color:'#2E86E0',
       fontWeight:'bold'
    }
})
