import React from 'react'
import {  Text, StyleSheet, ScrollView} from 'react-native'
import RecipeList from '../components/RecipeList'


const Recipe = ({ route }) => {
  
    const { Floor, NameImpasto, Water, idrat,liev,tempa,hliev,hFridge } = route.params
    
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ricetta: {NameImpasto}</Text>
               <RecipeList title={'Farina'} value={Floor} misure={'g'} />
               <RecipeList title={'Acqua'} value={Water} misure={'g'}/>
               <RecipeList title={'Idratazione'} value={idrat} misure={'%'}/>
               <RecipeList title={'Lievito'} value={`${liev}g fresco / ${(liev/2.8).toFixed(2)}g secco`}/>
               <RecipeList title={'H/Lievitazione'} value={hliev} misure={'/h'}/>
               <RecipeList title={'H/In Frigo'} value={hFridge} misure={'/h'}/>
               <RecipeList title={'Temp Ambiente'} value={tempa} misure={'°'}/>
            
              
        </ScrollView>
    
    )
}

export default Recipe
const styles = StyleSheet.create({
    container: {          
        alignItems: 'center',  
        marginTop:20,
      
    },
    title:{
        fontSize:20,
        marginBottom:10,
        fontWeight:'bold',
        fontFamily:'sans-serif-light',
        color:'black'
    }
    

})