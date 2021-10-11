import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import perfil from 'http://github.com/gabrielalimact.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header(){
    const [userName, setUserName] = useState<string>();
    
    useEffect( () => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    })
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>

            </View>

            <Image source={perfil} style={styles.image}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontFamily: fonts.text,
        fontSize: 32,
        color: colors.heading,
    },
    userName: {
        fontFamily: fonts.heading,
        fontSize: 32,
        color: colors.heading,
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }

})