import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                setIsAuthenticated(true);
            } else {
                router.replace('/auth/login');
            }

            setIsLoading(false);
        };

        checkAuthentication();
    }, [router]);

    if (isLoading) {
        SplashScreen.hideAsync();
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
