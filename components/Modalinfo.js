import React from 'react'
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


const Modalinfo = ({ visible,
  requestClose,
  open,
  animationType,
  transparent,
  titlePressable,
  text,
  titlePressableColor,
  titleSize,
  titleW,
  titlePadding,
  titleColor,
  rounded
}) => {




  return (
    <View >

      <Modal
        visible={visible}
        onRequestClose={requestClose}
        animationType={animationType}
        transparent={transparent}
      >
        <View style={styles.main__info}>
          <View style={styles.container__close}>
            <View style={styles.container__iconClose}>
              <Pressable onPress={requestClose} >
                <Text style={styles.iconClose}>X</Text>
              </Pressable>
            </View>
            <View style={{ padding:5,alignItems:'baseline' }}>
              {text.map((a,index) => <Text key={index} style={{color:`${titleColor}`, marginTop:8}}>{a.title} <Text>{a.txt}</Text></Text>)}

            </View>
           
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={open} style={rounded ? styles.titleround : styles.titleNoRound}>
        <Text style={{
          color: `${titlePressableColor}`,
          fontFamily: 'sans-serif-light',
          fontSize: titleSize,
          fontWeight: titleW,
          padding: titlePadding
        }}>
          {titlePressable}
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default Modalinfo

const styles = StyleSheet.create({
  titleround: {
    borderWidth: 1,
    borderColor: '#FFBD20',
    borderRadius: 50,
    width: 26,
    height: 26,
    alignItems: 'center',
    backgroundColor: '#FFBD20',
},
titleNoRound:{
    
},
  main__info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  container__close: {
    backgroundColor: '#2E86E0',
    width: 300,
    height: 200,
    borderRadius: 10,
    alignItems: 'center'
  },
  container__iconClose: {
    padding: 5,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  iconClose: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    padding: 10
  }
})
