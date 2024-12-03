
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { database, ref, get, update } from '../../firebaseConfig'; 

const ShoppingListScreen = ({ navigation }) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await get(ref(database, 'ingredients'));
        if (snapshot.exists()) {
          const ingredients = snapshot.val();
          const ingredientListWithKeys = Object.keys(ingredients).map(key => ({
            id: key,
            ...ingredients[key],
          }));
          setIngredientsList(ingredientListWithKeys);
        } else {
          setIngredientsList([]);
        }
      } catch (err) {
        console.error('Error fetching ingredients:', err);
        setError('Failed to fetch ingredients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const toggleBought = async (ingredientId) => {
    try {
      const ingredientToUpdate = ingredientsList.find(item => item.id === ingredientId);

      if (ingredientToUpdate) {
        const newBoughtStatus = !ingredientToUpdate.bought;
        const ingredientRef = ref(database, 'ingredients/' + ingredientId);

        
        await update(ingredientRef, { bought: newBoughtStatus });

       
        setIngredientsList(prevList =>
          prevList.map(item =>
            item.id === ingredientId ? { ...item, bought: newBoughtStatus } : item
          )
        );
      }
    } catch (err) {
      console.error('Error updating ingredient:', err);
      setError('Failed to update ingredient status. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Switch
        value={item.bought}
        onValueChange={() => toggleBought(item.id)}
      />
      <Text
        style={[
          styles.ingredientText,
          { textDecorationLine: item.bought ? 'line-through' : 'none' },
        ]}
      >
        {item.name}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading ingredients...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      <FlatList
        data={ingredientsList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* <Button
        title="Go to Add Ingredient"
        onPress={() => navigation.navigate('AddIngredient')}
      /> */}
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  ingredientText: {
    marginLeft: 10,
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ShoppingListScreen;
