


import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, TouchableHighlight, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { database, ref, get } from '../../firebaseConfig'; 
import { recipes as localRecipes } from '../../data/dataArrays'; 
import styles from './styles';

export default function HomeScreen({ navigation, setIsLoggedIn }) {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    photoUrl: 'https://www.example.com/path/to/profile-picture.jpg', 
  });
  const [recipes, setRecipes] = useState([]); 

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Logout"
          onPress={handleLogout}
          color="black"
          style={styles.headerRightButton}
        />
      ),
    });

    
    const fetchRecipes = async () => {
      try {
        const recipesRef = ref(database, 'recipes'); 
        const snapshot = await get(recipesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fetchedRecipes = Object.keys(data).map((key) => ({
            ...data[key],
            recipeId: key, 
          }));
          setRecipes(fetchedRecipes); 
        } else {
          console.log('No recipes found.');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); 
  }, [navigation]);

  const handleLogout = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(false); 
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      console.error('setIsLoggedIn function is not passed correctly');
    }
  };

  const onPressRecipe = (item) => {
    if (item && item.recipeId) { 
      navigation.navigate('Recipe', { item }); 
    } else {
      console.error('Invalid item:', item); 
    }
  };;

  const onPressButton = (type) => {
    if (type === 'Add Recipe') {
      navigation.navigate('AddRecipe');
    } else if (type === 'Shopping List') {
      navigation.navigate('ShoppingList');
    } else if (type === 'Add Ingredients') {
      navigation.navigate('AddIngredients');
    }
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableHighlight>
  );

  
  const combinedRecipes = [...localRecipes, ...recipes];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {}
      <View style={styles.storyContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { type: 'Add Recipe', image: require('../../../assets/add-task.png') },
            { type: 'Add Ingredients', image: require('../../../assets/store.png') },
            { type: 'Shopping List', image: require('../../../assets/check-list.png') },
          ].map(({ type, image }) => (
            <TouchableOpacity
              key={type}
              style={styles.squareButton}
              onPress={() => onPressButton(type)}
            >
              <Image source={image} style={styles.squareButtonImage} />
              <Text style={styles.squareButtonLabel}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={combinedRecipes} // Use combined data from both Firebase and local
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </SafeAreaView>
  );
}
