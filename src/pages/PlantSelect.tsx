import React from 'react';
import { 
    View,
    Text,
    StyleSheet,

} from 'react-native';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';


export function PlantSelect(){


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}> Em qual ambiente </Text>
                <Text style={styles.subtitle}> você quer colocar sua planta? </Text>
            </View>
            <EnviromentButton title='Cozinha'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        lineHeight:20,
        marginTop: 15,
        fontFamily: fonts.heading,
        fontSize: 18,
        color: colors.heading,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 18,
        color: colors.heading,
        lineHeight: 20,
    },

})