import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import Modalinfo from '../components/Modalinfo'
import Results from '../components/Results'
import Module2 from '../components/Module2'




const CalculateW = () => {
     

    const [far1, setFar1] = useState(100)
    const [far2, setFar2] = useState(100)
    const [w, setW] = useState(200)
    const [modalVisible, setModalVisible] = useState(false)




    if (isNaN(w)) { setW('') }
    if (isNaN(far1)) { setFar1('') }
    if (isNaN(far2)) { setFar2('') }


    const sumFar = 10 / (far1 - w + w - far2).toFixed(3);
    let valueFar1 = Math.round((((w - far2) * sumFar)) * 10)
    let valueFar2 = Math.round(((far1 - w) * sumFar) * 10)

    if (w < valueFar1 || w < valueFar2) {
        valueFar1 = 0,
            valueFar2 = 0
    }



    return (

        <View style={styles.container}>
            <View style={{ height: 120 }}>
                <Module2 title='W Voluto' defValue={w.toString()} input={(e) => { setW(parseInt(e)) }} add={() => setW(w + 5)} remove={() => setW(w - 5)} />

            </View>
            <View style={styles.container__ModuleFar}>
                <Module2 title="W 1° Farina" defValue={far1.toString()} input={(e) => { setFar1(parseInt(e)) }} add={() => setFar1(far1 + 5)} remove={() => setFar1(far1 - 5)} />
                <Module2 title="W 2° Farina" defValue={far2.toString()} input={(e) => { setFar2(parseInt(e)) }} add={() => setFar2(far2 + 5)} remove={() => setFar2(far2 - 5)} />
            </View>



            <View style={styles.title}>
                <Text style={styles.title__result}>Valori W Farine</Text>
            </View>
            <View style={styles.result}>
                <Results title='1° Farina' value={isNaN(valueFar1) || valueFar1 < 0 ? `0%` : `${valueFar1}%`} />
                <Results title="2° Farina" value={isNaN(valueFar2) || valueFar2 < 0 ? `0%` : `${valueFar2}%`} />
            </View>
            <View style={styles.modal}>
                <Modalinfo
                    visible={modalVisible}
                    requestClose={() => setModalVisible(!modalVisible)}
                    open={() => setModalVisible(true)}
                    animationType="fade"
                    transparent={true}
                    rounded={false}
                    titlePressable={'Info'}
                    titlePressableColor={'orange'}
                    titleSize={15}
                    titleW={'bold'}
                    titleColor={'white'}
                    text={[
                        { title: 'W :', txt: 'Forza della farina' },
                        { title: 'W voluto :', txt: 'W che si desidera ottenere' },
                        { title: 'Risultato :', txt: 'Percentuale di ogni farina per ottenere il (W) desiderato' }
                    ]}
                />



            </View>


        </View>
    )
}

export default CalculateW


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    container__ModuleFar: {
        flexDirection: 'row',

    },
    title: {
        marginTop: 30,
        marginBottom: 15,
    },
    title__result: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 20,
        color: '#FFBD20'
    },
    result: {
        flexDirection: 'row',
    },
    info: {
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'sans-serif-light',
    },
    main__info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    text__info: {
        textAlign: 'left',
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light'


    },
    modal: {
        marginTop: 20,

    }

})
