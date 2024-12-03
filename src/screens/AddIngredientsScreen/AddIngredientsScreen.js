import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { database, ref, set, push } from "../../firebaseConfig"; 

const AddIngredientsScreen = ({ navigation }) => {
  const [ingredient, setIngredient] = useState("");

  const addIngredient = async () => {
    if (!ingredient.trim()) {
      
      Alert.alert("Error", "Please enter an ingredient");
      return;
    }

    const newIngredient = {
      name: ingredient,
      bought: false,
    };

    try {
      
      const newIngredientRef = push(ref(database, "ingredients"));
      await set(newIngredientRef, newIngredient); 
      setIngredient(""); 
      alert("Ingredient added successfully");
    } catch (error) {
      console.error("Error adding ingredient: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Ingredient</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredient"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="Add Ingredient" onPress={addIngredient} />
      <Button
        title="Go to Shopping List"
        onPress={() => navigation.navigate("ShoppingList")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddIngredientsScreen;
