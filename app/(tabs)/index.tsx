import Card, { CardProps } from '@/components/Card';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { fetchData } from '@/services/apiService';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

interface Data {
    destinies: CardProps[]; // Array of destinies
}

const HomeScreen = () => {
    const [data, setData] = useState<Data>({ destinies: [] });
    const [page, setPage] = useState(1); // Track current page
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false); // Track loading more
    const [hasMoreData, setHasMoreData] = useState(true); // Track last page

    const getData = async (currentPage = 1) => {
        try {
            const result = await fetchData(`?page=${currentPage}`); // Append page param if API supports pagination

            setData(prevData => ({
                destinies: [...prevData.destinies, ...result.destinies], // Append new destinies
            }));

            if (currentPage >= result.last_page) {
                setHasMoreData(false); // A new state to track if more data exists
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        getData(page);
    }, []);

    const loadMoreData = () => {
        if (!loadingMore && hasMoreData) {
            setLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            getData(nextPage);
        }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#000' }}
            headerImage={
                <IconSymbol size={200} color="#808080" name="chevron.left.forwardslash.chevron.right" style={styles.headerImage} />
            }>
            <View className="flex flex-row items-center gap-3 w-full px-4">
                <ThemedText type="title">Your Destination</ThemedText>
            </View>
            <FlatList
                data={data.destinies}
                renderItem={({ item }) => <Card data={item} />}
                onEndReached={loadMoreData} // Trigger load more when reaching the end
                onEndReachedThreshold={0.5} // Trigger when 50% away from the end
                ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />

            {/* Error Handling */}
            {error && <ThemedText type="error">{error}</ThemedText>}

            {/* Initial Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </ParallaxScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
});
