import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { database, ref, set, get } from '../../firebaseConfig';

const AddRecipeScreen = () => {
  const [recipeName, setRecipeName] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const snapshot = await get(ref(database, 'ingredients'));
        if (snapshot.exists()) {
          setIngredientsList(Object.values(snapshot.val()));
        } else {
          setIngredientsList([]);
        }
      } catch (error) {
        console.error('Error fetching ingredients: ', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSubmit = async () => {
    if (recipeName && time && category && instructions && selectedIngredients.length > 0) {
      const newRecipe = {
        name: recipeName,
        time: time,
        category: category,
        instructions: instructions,
        ingredients: selectedIngredients,
      };

      try {
        const recipeId = new Date().getTime();
        const recipeRef = ref(database, 'recipes/' + recipeId);
        await set(recipeRef, newRecipe);

        setRecipeName('');
        setTime('');
        setCategory('');
        setInstructions('');
        setSelectedIngredients([]);

        Alert.alert('Success', 'Recipe added successfully!');
      } catch (error) {
        console.error('Error adding recipe:', error);
        Alert.alert('Error', 'Failed to add recipe. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter((item) => item !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const renderIngredientItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleIngredient(item)}>
      <View style={styles.ingredientItem}>
        <Text style={styles.ingredientText}>{item.name}</Text>
        {selectedIngredients.includes(item) && <Text style={styles.selectedText}>Selected</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
        style={styles.input}
      />
      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        style={styles.textarea}
        multiline
      />

      <Text style={styles.sectionHeader}>Select Ingredients:</Text>
      <FlatList
        data={ingredientsList}
        renderItem={renderIngredientItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10, 
    padding: 8,
  },
  textarea: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    height: 100,
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddRecipeScreen;
