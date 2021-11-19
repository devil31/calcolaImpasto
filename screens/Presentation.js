import React, { useState } from 'react'
import {
    View,
    Text,
    SafeAreaView,    
    useWindowDimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'
import slides from '../slides'
import { useDispatch } from 'react-redux'
import start from '../store/actions/start'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Presentation = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = React.useRef(null)
    const { height, width } = useWindowDimensions()
    const dispatch = useDispatch()

    const Slide = ({ item }) => {
        return (
            <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{height:height*0.58, marginTop:100,marginBottom:-120}}>
               <Image source={item.image} style={{ height: '50%', width, resizeMode: 'contain',marginTop:height*0.10}} /> 
            </View>
            <View style={{marginTop:30,width:width,alignItems:'center'}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
                
                
            </View>

        )
    }

    const Footer = () => {
        const setLaunch = () => {
            const save = {
                value: 'true'
            }
            dispatch(start(save))
            AsyncStorage.setItem('data', JSON.stringify(save.value))
        }
        return (
            <View style={{
                height: height*0.23,
                justifyContent: 'space-between',
                paddingHorizontal: 20,  
                backgroundColor:'white'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    {slides.map((_, index) => (
                        <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                            backgroundColor: 'orange',                           
                            width:15

                        }]} />
                    ))}
                </View>
                <View style={{ marginBottom: 20 }}>

                    {
                        currentSlideIndex == slides.length - 1 ?
                            <View style={{ height: 50 }}>
                                <TouchableOpacity style={[styles.btn]} onPress={() => setLaunch()}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15,color:'white' }}>Get Started</Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={{ flexDirection: 'row' }}>

                                <TouchableOpacity
                                    onPress={() => skip()}
                                    style={[styles.btn, { backgroundColor: '#2E86E0' }]}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Skipt</Text>
                                </TouchableOpacity>
                                <View style={{ width: 20 }}></View>
                                <TouchableOpacity style={[styles.btn]} onPress={() => goNextSlide()}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Next</Text>
                                </TouchableOpacity>
                            </View>
                    }




                </View>
            </View>
        )
    }
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex)
    }
    const goNextSlide = () => {
        const nexSlideIndex = currentSlideIndex + 1;
        if (nexSlideIndex != slides.length) {
            const offset = nexSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nexSlideIndex);
        }
    }
    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                pagingEnabled
                data={slides}
                contentContainerStyle={{ height: height * 0.85 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => <Slide item={item} />}
            />

            <Footer />
        </SafeAreaView>
    )
}

export default Presentation

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    description: {
        color: '#2E86E0',
        fontSize: 16,
        fontFamily:'sans-serif-light',
        fontWeight:'bold',
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'center',
        lineHeight: 23,

    },
    indicator: {
        borderRadius: 100,
        height: 10,
        width: 10,
        backgroundColor: 'lightgrey',
        marginHorizontal: 3,

    },
    btn: {
        flex: 1,
        backgroundColor: '#2E86E0',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    }
})
