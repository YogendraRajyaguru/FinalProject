import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,

  storyContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  squareButton: {
    width: RecipeCard.container.width,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#FF4500',
    borderRadius: 20,
  },

  squareButtonImage: {
    marginTop:10,
    width: '50%',
    height: '70%'
  },

  squareButtonLabel: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
});

export default styles;
