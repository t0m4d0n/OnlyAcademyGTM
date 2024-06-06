import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Pagamentos = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Escolha seu Plano de Inscrição</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Planos', { planId: 1 })}>
          <Ionicons size={32} color="green" />
          <Text style={styles.cardTitle}>FREE</Text>
          <Text style={styles.cardDescription}>Acesso gratuito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Planos', { planId: 2 })}>
          <Ionicons size={32} color="gold" />
          <Text style={styles.cardTitle}>MENSAL</Text>
          <Text style={styles.cardDescription}>R$29,90/ mês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Planos', { planId: 3 })}>
          <Ionicons size={32} color="purple" />
          <Text style={styles.cardTitle}>ANUAL</Text>
          <Text style={styles.cardDescription}>R$299,90/ ano</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: '30%',
    backgroundColor: '#ff6a06',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    color:"white",
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default Pagamentos;
