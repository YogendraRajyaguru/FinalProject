
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Signup/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import SavedRecipesScreen from '../screens/SavedRecipes/SavedRecipesScreen';
import AddRecipeScreen from '../screens/AddRecipe/AddRecipeScreen';
import AddIngredientsScreen from '../screens/AddIngredientsScreen/AddIngredientsScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen/ShoppingListScreen';
import FirebaseRecipeScreen from "../screens/RecipeScreens/RecipeScreens";

const Stack = createStackNavigator();

export default function AppContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = useCallback((userData) => {
    console.log('User data on login:', userData);
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={(props) => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin} />
              )}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={(props) => (
                <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} user={user} />
              )}
            />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="RecipesList" component={RecipesListScreen} />
            <Stack.Screen name="Ingredient" component={IngredientScreen} />
            <Stack.Screen name="IngredientsDetails" component={IngredientsDetailsScreen} />
            <Stack.Screen name="SavedRecipes" component={SavedRecipesScreen} />
            <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
            <Stack.Screen name="AddIngredients" component={AddIngredientsScreen} />
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
          </>
        )}
        <Stack.Screen name="FirebaseRecipe" component={FirebaseRecipeScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
