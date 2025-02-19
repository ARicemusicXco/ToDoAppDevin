import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import type { Todo } from '../types/todo';

const initialTodos: Todo[] = [
  { id: '1', text: 'Learn React Native', completed: false, createdAt: new Date() },
  { id: '2', text: 'Build a Todo App', completed: true, createdAt: new Date() },
  { id: '3', text: 'Implement Redis later', completed: false, createdAt: new Date() },
];

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo..."
          placeholderTextColor="#9ca3af"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoTextContainer}
              onPress={() => toggleTodo(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxChecked,
                ]}
              />
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeTodo(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366f1',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#6366f1',
  },
  todoText: {
    fontSize: 16,
    color: '#1f2937',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 6,
    padding: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
