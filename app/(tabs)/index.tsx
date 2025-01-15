import Card, { CardProps } from "@/components/Card";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { fetchData } from "@/services/apiService";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { FlatList, View } from "react-native";

interface Data {
  destinies: CardProps[]; // Array of destinies
}

const HomeScreen = () => {
  const [data, setData] = useState<Data>({ destinies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [loadingMore, setLoadingMore] = useState(false); // Track loading more

  const getData = async (currentPage = 1) => {
    try {
      const result = await fetchData(`?page=${currentPage}`); // Append page param if API supports pagination

      setData((prevData) => ({
        destinies: [...prevData.destinies, ...result.destinies], // Append new destinies
      }));
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, []);

  const loadMoreData = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      getData(nextPage);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#000" }}
    >
      <View className="flex flex-row items-center gap-3 w-full px-4">
        <ThemedText type="title">Your Destination</ThemedText>
      </View>
      <FlatList
        data={data.destinies}
        renderItem={({ item }) => <Card data={item} />}
        onEndReached={loadMoreData} // Trigger load more when reaching the end
        onEndReachedThreshold={0.5} // Trigger when 50% away from the end
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
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
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  row: {
    justifyContent: "space-between", // Adds spacing between columns
    marginBottom: 8,
  },
});
