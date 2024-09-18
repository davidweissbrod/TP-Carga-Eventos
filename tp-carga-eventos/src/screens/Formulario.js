// FormularioScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
  Modal,
  Alert
} from 'react-native';

// URL de la API para obtener categorías y ubicaciones
const CATEGORIES_API_URL = 'https://api.example.com/event-categories';
const LOCATIONS_API_URL = 'https://api.example.com/event-locations';
const API_URL = 'https://api.example.com/events';

const FormularioScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [maxAssistance, setMaxAssistance] = useState('');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_API_URL);
        if (!response.ok) throw new Error('Error al obtener categorías');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        Alert.alert('Error', error);
      }
    };

   
    const fetchLocations = async () => {
      try {
        const response = await fetch(LOCATIONS_API_URL);
        if (!response.ok) throw new Error('Error al obtener ubicaciones');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        Alert.alert('Error', error);
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);


  const handleSubmit = () => {
  
    if (!name || !description || !category || !location || !startDate || !duration || !price || !maxAssistance) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }
    
    setConfirmModalVisible(true);
  };


  const handleConfirm = async () => {
    const eventData = {
      name,
      description,
      id_event_category: category,
      id_event_location: location,
      start_date: startDate,
      duration_in_minutes: parseInt(duration),
      price: parseInt(price),
      max_assistance: parseInt(maxAssistance),
      enabled_for_enrollment: true, 
      id_creator_user: 1, 
      tags: [], 
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Error al publicar el evento');
      }

      setConfirmModalVisible(false);
      setSuccessModalVisible(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Nuevo Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del evento"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Selecciona una categoría" value={null} />
        {categories.map(cat => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={location}
        style={styles.picker}
        onValueChange={(itemValue) => setLocation(itemValue)}
      >
        <Picker.Item label="Selecciona una ubicación" value={null} />
        {locations.map(loc => (
          <Picker.Item key={loc.id} label={loc.name} value={loc.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración en minutos"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Máximo de asistentes"
        value={maxAssistance}
        onChangeText={setMaxAssistance}
        keyboardType="numeric"
      />

      <Button title="Guardar Evento" onPress={handleSubmit} />

      <Modal
        transparent={true}
        visible={confirmModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Evento</Text>
            <Text style={styles.modalText}>¿Está seguro de que desea publicar este evento?</Text>
            <Button title="Confirmar" onPress={handleConfirm} />
            <Button title="Cancelar" onPress={() => setConfirmModalVisible(false)} />
          </View>
        </View>
      </Modal>
      
      <Modal
        transparent={true}
        visible={successModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Éxito</Text>
            <Text style={styles.modalText}>Su evento se ha publicado correctamente.</Text>
            <Button title="Aceptar" onPress={() => {
              setSuccessModalVisible(false);
              navigation.goBack(); 
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default FormularioScreen;
