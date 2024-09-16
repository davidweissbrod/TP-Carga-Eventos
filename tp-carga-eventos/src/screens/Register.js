import React, { useState } from 'react';
import axios from 'axios';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';

const RegisterScreen = ({ navigation }) =>{
    const urlRegister = 'https://localhost:3000/register'
    const [name, onChangeName] = useState('')
    const [last_name, onChangeLastName] = useState('')
    const [username, onChangeUsername] = useState('');
    const [pass, onChangeTextPass] = useState('');

    const handleRegister = async () => {
      try {
        const response = await axios.post(urlRegister, { first_name, last_name, username, password });
        if (response.status === 200) {
          navigation.navigate('Home');
        }
      } catch (error) {
        Alert.alert('Error al registrarse');
      }
    };
    const navigateToLogin = () => {
      navigation.navigate('Login');
    };

    return(
        <SafeAreaView style = {styles.container}>
            <View style={styles.innerContainer}>
            <Text style = {styles.title}>Register</Text>
            <TextInput 
             style = {styles.input}
             value={name}
             onChangeText={onChangeName}
             placeholder='Ingrese su nombre'
             placeholderTextColor="#aaa"
            />
            <TextInput 
             style = {styles.input}
             value={last_name}
             onChangeText={onChangeLastName}
             placeholder='Ingrese su apellido'
             placeholderTextColor="#aaa"
            />
            <TextInput 
             style = {styles.input}
             value={username}
             onChangeText={onChangeUsername}
             placeholder='Ingrese un usuario'
             placeholderTextColor="#aaa"
            />
            <TextInput 
             style = {styles.input}
             value={pass}
             onChangeText={onChangeTextPass}
             placeholder='Ingrese una contraseña'
             secureTextEntry={true}
             placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.link} onPress={navigateToLogin}>¿Ya tenes cuenta?</Text>
            </View>
        </SafeAreaView>
    );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      input: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        backgroundColor: '#fafafa',
        fontSize: 16,
      },
      button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      link: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: 10,
      },
});

  export default RegisterScreen