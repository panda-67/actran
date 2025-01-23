import ParallaxScrollView from '@/components/ParallaxScrollView';
import { API_BASE_URL } from '@/services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginScreen = () => {
    const { handleSubmit, setValue } = useForm<LoginFormInputs>();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const onSubmit = async (data: LoginFormInputs) => {
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            });

            const res = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('token', res.token);
                router.replace('/');
            } else {
                setErrorMessage(`${res.message}. Login failed, please try again`);
                setIsSubmitting(false); // Simulate loading
            }
        } catch (error) {
            setErrorMessage('Network error, please try again later.');
            setIsSubmitting(false); // Simulate loading
            console.error(error);
        }
    };

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#000' }}>
            <Stack.Screen options={{ title: 'Login' }} />
            <View className="flex-1 justify-center items-center px-4">
                <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <Text className="text-2xl font-bold text-center mb-6">Login</Text>

                    {/* Email Input */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={text => setValue('email', text)}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                        />
                    </View>

                    {/* Password Input */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
                        <View className="relative">
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                onChangeText={text => setValue('password', text)}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} className="absolute right-3 top-3">
                                <Text className="text-sm text-indigo-600 font-semibold">{showPassword ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {errorMessage != '' ? <Text className="text-sm font-medium text-rose-700">{errorMessage}</Text> : null}

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className={`w-full py-3 mt-4 bg-indigo-600 rounded-lg ${isSubmitting ? 'opacity-50' : ''}`}>
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text className="text-center text-white font-semibold">Login</Text>
                        )}
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <View className="mt-6">
                        <TouchableOpacity>
                            <Text className="text-sm text-indigo-600 text-center font-semibold">Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ParallaxScrollView>
    );
};

export default LoginScreen;
