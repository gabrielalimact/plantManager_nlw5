import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import perfil from '../assets/perfil.png';

export function Header(){

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Gabriela</Text>

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