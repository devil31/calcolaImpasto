import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Image, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Saved = ({ navigation }) => {
  const [SaveData, setSaveData] = useState([]);
  const [modaladvise, setModalAdvise] = useState(false)
  const [loading, setLoading] = useState(true)

useEffect(() => {
      fetchData()
  }, [SaveData])
 

  const fetchData = async () => {
    
    try {
      
      const responce = await axios.get('https://calcpizza-default-rtdb.europe-west1.firebasedatabase.app/Saved.json')
      const SaveList = [];

      for (let key in responce.data) {
        SaveList.push({
          NameImpasto: responce.data[key].NameImpasto,
          Floor: responce.data[key].Floor,
          liev: responce.data[key].liev,
          Water: responce.data[key].Water,
          idrat: responce.data[key].idrat,
          tempa: responce.data[key].tempa,
          hliev: responce.data[key].hliev,
          hFridge: responce.data[key].hFridge,
          key: key,
        })
      }
      await setSaveData(SaveList)
     await setLoading(false)
    } catch (error) {
      console.warn(error)
    } 
    
  }

 
  const canc = async (item) => {
    setModalAdvise(!modaladvise)
    await axios.delete(`https://calcpizza-default-rtdb.europe-west1.firebasedatabase.app/Saved/${item}.json`)

  }


  const renderSaveData = () => {
    return SaveData.map((item, index) => {
      return (

        <TouchableOpacity key={index} style={styles.containerItem} onPress={() => navigation.navigate("Recipe", {
          Floor: item.Floor,
          NameImpasto: item.NameImpasto,
          Water: item.Water,
          idrat: item.idrat,
          liev: item.liev,
          tempa: item.tempa,
          hliev: item.hliev,
          hFridge: item.hFridge,

        })}>
          <View>
            <Text style={styles.title}>{item.NameImpasto}</Text>
          </View>
          <View style={styles.containerResults}>
            <Text>Farina: {item.Floor / 100}/Kg</Text>
            <Text>Acqua: {item.Water / 100}/kg</Text>
            <Text>Lievito:  {item.liev}/g</Text>

          </View>
          <Modal
            transparent={true}
            animationType='fade'
            visible={modaladvise}
            onRequestClose={() => { setModalAdvise(!modaladvise) }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.containerAdvise}>
                <Pressable onPress={() => setModalAdvise(!modaladvise)}>
                  <View style={styles.close}>
                    <Text>X</Text>
                  </View>
                </Pressable>

                <View style={styles.titleAdvise}>
                  <Text style={{ fontSize: 16, fontFamily: 'sans-serif-light', fontWeight: 'bold',color:'grey' }}>Sicuro di voler Eliminare ? </Text>
                </View>

                <View style={styles.choice}>
                  <Pressable onPress={() => setModalAdvise(!modaladvise)}>
                    <View style={styles.annulla}>
                      <Text style={{ color: '#2E86E0', fontWeight: 'bold', fontFamily: 'sans-serif-light', fontSize: 16 }}>Annulla</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => canc(item.key)}>
                    <View style={styles.ok}>
                      <Text style={{ color: '#2E86E0', fontWeight: 'bold', fontFamily: 'sans-serif-light', fontSize: 16 }}>Ok</Text>
                    </View>
                  </Pressable>

                </View>

              </View>

            </View>
          </Modal>

          <TouchableOpacity style={styles.trash} onPress={() => { setModalAdvise(!modaladvise) }}>
            <Ionicons name='trash' size={24} />
          </TouchableOpacity>


        </TouchableOpacity>
      )
    })
  }

  return (
    
    <View style={styles.container}>    
    {loading ? <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size={50} color='orange'/></View>  :
      SaveData == '' ? <View style={styles.nodata}>
        <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light' }}>Nessun Impasto Salvato</Text>
        <Image resizeMode={'center'} style={{ width: '80%', height: '40%',marginRight:'10%' }} source={require('../img/pizza.gif')} />
      </View> : renderSaveData()}
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  containerItem: {
    borderWidth: 1.5,
    borderColor: '#2E86E0',
    height: 120,
    marginTop: 20,
    width: '70%',
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
    marginTop: 5,
    marginBottom: 5,
  },
  containerResults: {
    marginHorizontal: 10
  },
  delete: {
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    marginVertical: -10,
    width: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center'

  },
  containerAdvise: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  close: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: 25,
    height: 25,
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
    borderRadius: 50
  },
  titleAdvise: {
    alignItems: 'center',
    marginTop: 30
  },
  choice: {

    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    padding: 5,
  },
  annulla: {
    marginRight: 20,
    padding: 2,
  },
  ok: {
    marginRight: 35,
    padding: 2,
  },
  trash: {
    width: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: -10,
    marginRight: 5,
  },
  nodata: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }

})
