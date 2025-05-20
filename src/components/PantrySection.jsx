import React, { useState } from 'react';
import {
    Box,
    Heading,
    Input,
    Button,
    List,
    ListItem,
    Text,
    Flex,
    VStack,
} from '@chakra-ui/react';

function PantrySection({ onNext }) {
    const [pantryItems, setPantryItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const addIngredient = () => {
        if (newItem.trim()) {
            setPantryItems([...pantryItems, newItem.trim()]);
            setNewItem('');
        }
    };

    const removeIngredient = (index) => {
        setPantryItems(pantryItems.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            <Heading size="md">My Pantry</Heading>
            <Flex gap={2}>
                <Input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add an ingredient..."
                />
                <Button colorScheme="blue" onClick={addIngredient}>
                    Add
                </Button>
            </Flex>
            <List spacing={2}>
                {pantryItems.map((item, index) => (
                    <ListItem
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                        bg="gray.50"
                        borderRadius="md"
                    >
                        <Text>{item}</Text>
                        <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => removeIngredient(index)}
                        >
                            Remove
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Button
                colorScheme="blue"
                onClick={() => onNext(pantryItems)}
                isDisabled={pantryItems.length === 0}
            >
                Next →
            </Button>
        </VStack>
    );
}

export default PantrySection; 