import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,

} from 'react-native';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import api from '../services/api';
import { EnviromentButton } from '../components/EnviromentButton';

interface EnvironmentProps {
    key: string;
    title: string;
}
export function PlantSelect(){
    const[environments, setEnvironments] = useState<EnvironmentProps[]>();

    useEffect(() =>{
        async function fetchEnviroment(){
            const { data } = await api.get('plants_environments');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ... data
            ]);
        }

        fetchEnviroment();

    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}> Em qual ambiente </Text>
                <Text style={styles.subtitle}> você quer colocar sua planta? </Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            
                        />

                    )}
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                    contentContainerStyle={styles.environmentList}
                />
            </View>
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
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

})