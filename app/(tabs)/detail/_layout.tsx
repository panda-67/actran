import React from 'react';
import { Stack } from 'expo-router';
import AuthGuard from '@/guards/Auth';

export default function DetailLayout() {
    return (
        <AuthGuard>
            <Stack>
                <Stack.Screen name="[id]" options={{ headerShown: false }} />
            </Stack>
        </AuthGuard>
    );
}
