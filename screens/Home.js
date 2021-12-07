import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Text, Modal, Pressable, Button,SafeAreaView,StatusBar } from 'react-native'
import Btn from '../components/Btn'
import Module2 from '../components/Module2'
import Results from '../components/Results'
import Modalinfo from '../components/Modalinfo'
import { Ionicons } from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios';
import { useSelector } from 'react-redux';







const Home = ({ navigation }) => {
    const [nPan, setNpan] = useState(10)
    const [whPan, setWhPan] = useState(200)
    const [idrat, setIdrat] = useState(50)
    const [salt, setSalt] = useState(50)
    const [tempa, setTTempA] = useState(20)
    const [hliev, setHliev] = useState(24)
    const [hFridge, setHfridge] = useState(12)
    const [pressedLsa, setPressedLsa] = useState(false)
    const [pressedLbf, setPressedLbf] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalSave, setModalSave] = useState(false)
    const [NameImpasto, setNameIpasto] = useState('')
    const Id = useSelector(state => state.authUser.userId)
    
   




    if (isNaN(nPan)) { setNpan('') }
    if (isNaN(whPan)) { setWhPan('') }
    if (isNaN(idrat)) { setIdrat('') }
    if (isNaN(salt)) { setSalt('') }
    if (isNaN(tempa)) { setTTempA('') }
    if (isNaN(hliev)) { setHliev('') }
    if (isNaN(hFridge)) { setHfridge('') }

    const constFloor = (idrat * (salt) + Math.pow(10, 3) * (idrat + 100))
    const timeConst = hliev - 9 * hFridge / 10;
    const totalWh = nPan * whPan;
    const Floor = Math.round(Math.pow(10, 5) * totalWh / constFloor)
    const Water = Math.round((Math.pow(10, 3) * idrat * totalWh) / constFloor)
    const TotSalt = Math.round((salt * idrat * totalWh) / constFloor)
    const tempConst = tempa * (1 - 0.25 * 0)
    const o = 0;
    const h = 2250 * (1 + salt / 200) * (1 + o / 300) / ((4.2 * idrat - 80 - 0.0305 * idrat * idrat) * Math.pow(tempConst, 2.5) * Math.pow(timeConst, 1.2))
    const liev = Floor * h;




    const lsa = () => {

        setPressedLsa(true)
        setPressedLbf(false)


    }
    const lbf = () => {

        setPressedLbf(true)
        setPressedLsa(false)
    }


    const Save = () => {      
            setModalSave(true)
            }
    const Saved = () => {
        try {
            axios.post('https://calcpizza-default-rtdb.europe-west1.firebasedatabase.app/Saved.json', {
                NameImpasto: NameImpasto,
                Floor: Floor,
                Water: Water,
                TotSalt: TotSalt,
                liev: liev.toFixed(2),
                idrat: idrat,
                tempa: tempa,
                hliev: hliev,
                hFridge: hFridge,
                Id:Id,
            })
        } catch (error) {
            console.warn(error)
        }
        navigation.navigate("Saved")
        setNameIpasto('')
        setModalSave(!modalSave)
    }




    return (
        <SafeAreaView>
        <StatusBar backgroundColor={'#2E86E0'}/>
              <ScrollView style={styles.containerScroll}>

            <View style={styles.firstModule}>

                <Module2 title="N° panetti" input={(e) => { setNpan(parseInt(e)) }} defValue={nPan.toString()} add={()=>setNpan(nPan+1)} remove={()=>setNpan(nPan-1)} error={nPan<=0 ? 'solo valori positivi':""}/>
                <Module2 title="Peso Panetti" input={(e) => { setWhPan(parseInt(e)) }} defValue={whPan.toString()} add={()=>setWhPan(whPan+5)} remove={()=>setWhPan(whPan-5)} error={whPan<=0?'inserisci valori positivi':""}/>
            </View>

            <View style={styles.secondModule}>
                <Module2 title="Idratazione %" input={(e) => { setIdrat(parseInt(e)) }} defValue={idrat.toString()} add={()=>setIdrat(idrat+1)} remove={()=>setIdrat(idrat-1)} error={idrat < 50 || idrat > 100 ? "valori da 50 a 100" : ""} />
                <Module2 title="Sale g/L" input={(e) => { setSalt(parseInt(e)) }} defValue={salt.toString()} add={()=>setSalt(salt+1)} remove={()=>setSalt(salt-1)} error={salt < 0 || salt > 70 ? "valori da 0 a 70" : ""} />

            </View>

            <Module2 title="Temp Amb C°" input={(e) => { setTTempA(parseInt(e)) }} defValue={tempa.toString()} add={()=>setTTempA(tempa+1)} remove={()=>setTTempA(tempa-1)} error={tempa < 15 || tempa > 35 ? "valori da 15 a 35" : ""} />

            <View style={styles.thirdModule}>
                <Module2 title="Ore Liev" input={(e) => { setHliev(parseInt(e)) }} defValue={hliev.toString()} add={()=>setHliev(hliev+1)} remove={()=>setHliev(hliev-1)} error={hliev < 3 || hliev > 96 ? "valori da 3 a 96" : ""} />
                <Module2 title="Ore in frigo" input={(e) => { setHfridge(parseInt(e)) }} defValue={hFridge.toString()} add={()=>setHfridge(hFridge+1)} remove={()=>setHfridge(hFridge-1)} error={hFridge >= hliev ? "ore in frigo errate" : ""} />
            </View>


            <View style={styles.button}>

                <Btn fnliev={() => lbf()} lv={'LBF'} pressed={pressedLbf} />
                <Btn fnliev={() => lsa()} lv={'LSA'} pressed={pressedLsa} />

                <Modalinfo
                    visible={modalVisible}
                    requestClose={() => setModalVisible(!modalVisible)}
                    open={() => setModalVisible(true)}
                    animationType="fade"
                    transparent={true}
                    rounded={true}
                    titlePressable={'i'}
                    titlePressableColor={'white'}
                    titleSize={15}
                    titleW={'bold'}
                    titleColor={'white'}
                    text={[
                        { title: 'LBF :', txt: 'Lievito di birra Fresco' },
                        { title: 'LSA :', txt: 'Lievito Secco Attivo' }
                    ]}
                />


            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}><View style={{ borderBottomWidth: 1, width: '50%' }} /></View>
            <View style={styles.container__Result}>

                <Text style={styles.result__title} >Impasto</Text>
                <View style={styles.result}>
                    <Results title="Farina" value={`${Floor}g`} />
                    <Results title="Acqua" value={`${Water}g`} />
                    <Results title="Sale" value={`${TotSalt}g`} />
                    <Results title="Liev" value={pressedLbf ? `${liev.toFixed(2)}g` : `${(liev / 2.8).toFixed(2)}g`} />
                </View>
                <View style={styles.ContainerSave}>
                    <View style={styles.save}>
                        <TouchableOpacity onPress={() => Save()}>
                            <Ionicons name="save" size={24} color={'white'} />
                        </TouchableOpacity>

                    </View>
                </View>

                <Modal
                    animationType='fade'
                    visible={modalSave}
                    transparent={true}
                    onRequestClose={() => { setModalSave(!modalSave) }}>

                    <View style={styles.container__Save}>

                        <View style={styles.main__Save}>

                            <Pressable style={styles.closeModal} onPress={() => setModalSave(!modalSave)} >

                                <Text style={{ color: 'black' }}>X</Text>

                            </Pressable>

                            <View style={styles.Input}>
                                <TextInput value={NameImpasto} placeholder=' Nome Impasto   ' style={{ backgroundColor: 'white', borderBottomWidth: 1, width: '100%', height: 35 }} onChangeText={(e) => setNameIpasto(e)} />
                            </View>


                            <View style={styles.saveButton}>
                                <Button onPress={() => Saved()} title='save' color="#2E86E0" />
                            </View>
                        </View>
                    </View>

                </Modal>

            </View>


        </ScrollView>
        </SafeAreaView>

      
    )
}

export default Home

const styles = StyleSheet.create({
    containerScroll: {
        backgroundColor: '#fff',
    },
    firstModule: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',

    },
    secondModule: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    thirdModule: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    container__Result: {
        marginTop: 10,
        alignItems: 'center',
    },
    result: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        flexWrap: 'wrap',

    },
    result__title: {
        fontWeight: '700',
        fontSize: 20,
        color: '#FFBD20',
        marginBottom: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        width: '100%'
    },
    info: {
        borderWidth: 1,
        borderColor: '#FFBD20',
        borderRadius: 50,
        width: 26,
        height: 26,
        alignItems: 'center',
        backgroundColor: '#FFBD20',
    },
    info__txt: {
        color: 'white',
        fontWeight: '700'
    },
    ContainerSave: {
        alignItems: 'flex-end',
        borderRadius: 50,
        width: '100%'
    },
    save: {
        marginRight: 25,
        borderWidth: 1,
        borderColor: '#FFBD20',
        borderRadius: 50,
        padding: 10,
        marginTop: -5,
        backgroundColor: '#FFBD20',
    },
    main__Save: {
        backgroundColor: 'white',
        width: '70%',
        height: 200,
        borderRadius: 10,
        alignItems: 'center'
    },
    closeModal: {
        padding: 5,
        position: 'relative',
        left: 100,
        top: 10


    },
    container__Save: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Input: {
        marginTop: 40,
        width: '70%',

    },
    saveButton: {
        marginTop: 20,
        width: '40%',


    }



})
