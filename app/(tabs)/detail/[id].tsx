import { CardProps } from '@/components/Card';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { API_BASE_URL } from '@/services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, useColorScheme, View } from 'react-native';

const DetailScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [itemDetails, setItemDetails] = useState<CardProps>();
    const colorScheme = useColorScheme();

    useEffect(() => {
        const fetchItemDetails = async () => {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/${id}/show`, {
                headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log('Data', data);
            setItemDetails(data.destination);
        };

        fetchItemDetails();
    }, [id]);

    if (!itemDetails) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    let imageUrls: string[] = [];

    if (itemDetails.images) {
        imageUrls = JSON.parse(itemDetails.images);
    }

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#000' }}>
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>{itemDetails.title}</Text>
            <Image
                source={{ uri: imageUrls.length > 1 ? imageUrls[1] : imageUrls[0] }}
                accessibilityLabel={itemDetails.title}
                className="h-48 w-full object-cover rounded-lg"
            />

            <ThemedText>{itemDetails.description}</ThemedText>
            <Button title="Back" onPress={() => router.back()} />
        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default DetailScreen;
