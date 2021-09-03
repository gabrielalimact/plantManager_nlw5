import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,

} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

interface EnvironmentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
    };
    hour: string;
    dateTimeNotification: Date;
}

export function PlantSelect(){
    const[environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const[plants, setPlants] = useState<PlantProps[]>([]);
    const[plantsFilter, setPlantsFilter] = useState<PlantProps[]>([]);
    const[environmentSelected, setEnvironmentSelected] = useState('all');
    const[loading, setLoading] = useState(true);

    const[page, setPage] = useState(1);
    const[loadingMore, setLoadingMore] = useState(true);


    function handleEnvironmentSelected(environment: string){
        setEnvironmentSelected(environment)

        if(environment === 'all')
            return setPlantsFilter(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );

        setPlantsFilter(filtered);
    }

    async function fetchPlants(){
        const { data } = await api
        .get('plants?_sort=name&_order=asc&_page=${page}');


        if(!data)
            return setLoading(true);
        

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setPlantsFilter(oldValue => [ ...oldValue, ...data])
        }else{
            setPlants( data );
            setPlantsFilter(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number){
        if(distance < 1){
            return;
        }
        

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    useEffect(() =>{
        async function fetchEnviroment(){
            const { data } = await api
            .get('plants_environments?_sort=title&_order=asc');
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

    useEffect(() => {
        fetchPlants();
    },[])

    if(loading) 
        return <Load />

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
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />

                    )}
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={plantsFilter}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.5}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
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
        margin: 32,
        marginVertical: 20,
        paddingRight: 50
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },


})