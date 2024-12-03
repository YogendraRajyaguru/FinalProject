import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

export default function RecipeScreen({ route }) {
  const { item } = route.params;

  
  if (!item || !item.recipeId) {
    return (
      <SafeAreaView>
        <Text>Error: Recipe not found or invalid data passed!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Image source={{ uri: item.photo_url }} style={{ width: 100, height: 100 }} />
      <Text>{item.title}</Text>
      <Text>{item.category}</Text>
      <Text>{item.description}</Text>
      {}
    </SafeAreaView>
  );
}
