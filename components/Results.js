import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Results = ({ title, value }) => {
  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: '700',fontSize:15,color:'#242628' }}>{title}</Text>
      <Text style={{color:'#FFBD20',fontWeight:'700',fontSize:15}}>{value}</Text>


    </View>
  )
}

export default Results

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderWidth: 1.7,
    borderColor: '#EF3340',    
    width: 130,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },

})
