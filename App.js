import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [keynumber, setKeynumber] = useState('');
  const [repository, setRepositories] = useState([]);
  
  const [selectedCurrency, setCurrency] = useState();
  const [rate, setRate] = useState([]);

  const [result, setResult] = useState();

  var myHeaders = new Headers();
myHeaders.append("apikey", "ACmD3wqyXCSdgOq5XiMlVnE99wjZ2vx4");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


//Hae valuutat Pickeriin ja valittu kurssikerroin
const getRepositories = () => {
    fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
    .then(response => response.json())
    .then(data => setRepositories(Object.keys((data.rates))))
    .catch(error => console.log('error', error));
  }
    
const convert = () => {
  fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${selectedCurrency}&base=EUR`, requestOptions)
    .then(response => response.json())
    .then(data => setRate(Object.values(data.rates)))
    .catch(error => console.log('error', error));

  setResult((keynumber / rate).toFixed(2));

}
useEffect(() => {
  getRepositories();
}, []);


  return (
    <View style={styles.container}>  
<Text> {result} € </Text>
  
  <TextInput style={{fontSize:18, width:200}} 
      placeholder='amount'
      onChangeText={text => setKeynumber(text) } 
      value={keynumber}
      keyboardType="numeric"
      />

     
    <View style={{fontSize:18, width:200}} >
    <Picker
    selectedValue={selectedCurrency}
    onValueChange={(itemValue, itemIndex) =>
    setCurrency(itemValue)
  }>
    {repository.map((item, index) => {
      return (<Picker.Item label={item} value={item} key={index} />)
    })}
  

  
</Picker>
</View>

      <Button title="Convert" onPress= {convert} />
      <StatusBar style="auto" />
  </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});


