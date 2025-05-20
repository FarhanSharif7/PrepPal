import React from 'react';
import {
    VStack,
    Heading,
    Box,
    Text,
    Button,
    List,
    ListItem,
} from '@chakra-ui/react';

function RecipeSection({ pantryItems, onBack }) {
    const findMatchingRecipes = (pantryItems) => {
        return recipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
            return recipeIngredients.every(ingredient =>
                pantryItems.some(pantryItem => pantryItem.toLowerCase().includes(ingredient))
            );
        });
    };

    const matchingRecipes = findMatchingRecipes(pantryItems);

    return (
        <VStack spacing={4} align="stretch">
            <Heading size="md">Recipe Suggestions</Heading>
            {matchingRecipes.length === 0 ? (
                <Text>No recipes found with your current pantry items. Try adding more ingredients!</Text>
            ) : (
                matchingRecipes.map((recipe, index) => (
                    <Box
                        key={index}
                        p={4}
                        bg="gray.50"
                        borderRadius="md"
                        boxShadow="sm"
                    >
                        <Heading size="sm" color="blue.600" mb={2}>
                            {recipe.name}
                        </Heading>
                        <Box mb={2}>
                            <Text fontWeight="bold" fontSize="sm" color="gray.600">
                                Ingredients:
                            </Text>
                            <List spacing={1}>
                                {recipe.ingredients.map((ingredient, i) => (
                                    <ListItem key={i} fontSize="sm">
                                        {ingredient}
                                        {pantryItems.some(item =>
                                            item.toLowerCase().includes(ingredient.toLowerCase())
                                        ) && " ✓"}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" fontSize="sm" color="gray.600">
                                Instructions:
                            </Text>
                            <Text fontSize="sm" whiteSpace="pre-line">
                                {recipe.instructions}
                            </Text>
                        </Box>
                    </Box>
                ))
            )}
            <Button onClick={onBack} colorScheme="blue" variant="outline">
                ← Back to Pantry
            </Button>
        </VStack>
    );
}

export default RecipeSection; 