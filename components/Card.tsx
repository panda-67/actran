import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Text } from "react-native";

const Card = ({ data }: { data: CardProps }) => {
  let imageUrls: string[] = [];

  if (data.images) {
    imageUrls = JSON.parse(data.images);
  }

  return (
    <View style={styles.cardContainer}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrls.length > 1 ? imageUrls[1] : imageUrls[0] }}
          accessibilityLabel={data.title}
          style={styles.image}
        />
      </View>

      {/* Text Content Section */}
      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>{data.title}</ThemedText>

        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>
          {data.description}
        </Text>

        {/* Link Section */}
        <TouchableOpacity style={styles.learnMoreButton}>
          <ThemedText style={styles.learnMoreText}>Learn More</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

export interface CardProps {
  title: string;
  description?: string;
  images?: string;
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
    marginHorizontal: 12,
  },
  imageContainer: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: 192,
    width: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    fontWeight: "300",
    marginBottom: 12,
  },
  learnMoreButton: {
    marginTop: 12,
    backgroundColor: "#4c6ef5", // Indigo color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignSelf: "flex-start", // Align to the left
  },
  learnMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
