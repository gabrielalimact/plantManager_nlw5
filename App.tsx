import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';


import Routes from './src/routes/index';
import { View, StyleSheet, StatusBar } from 'react-native';


export default function App(){
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading />
  
  }
  
  return(
    <>
      <View>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#000000"
          translucent={false}
          networkActivityIndicatorVisible={true} />
      </View>
      
      <Routes />
    </>
  )
}