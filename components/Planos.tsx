import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { Ionicons } from '@expo/vector-icons';

type PlanScreenRouteProp = RouteProp<RootStackParamList, 'Planos'>;

type Props = {
  route: PlanScreenRouteProp;
};

const Planos = ({ route }: Props) => {
  const { planId } = route.params;
  const accessToken = 'TEST-5332680040177398-060512-6882053dfde32020f2ba94bedbca14d0-1845533836';

  const handleFinalizarPagamento = async () => {
    try {
      const data = {
        items: [
          {
            id: '1234',
            title: 'Dummy Title',
            description: 'Dummy description',
            picture_url: 'http://www.myapp.com/myimage.jpg',
            category_id: 'subscription',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 10,
          },
        ],
        back_urls: {
          success: 'http://test.com/success',
          failure: 'http://test.com/failure',
          pending: 'http://test.com/pending',
        }
      };

      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao finalizar pagamento:', errorData);
        Alert.alert('Erro', `Ocorreu um erro ao finalizar o pagamento: ${errorData.message}`);
        return;
      }

      const responseData = await response.json();

      if (!responseData.init_point) {
        Alert.alert('Erro', 'init_point não encontrado na resposta.');
        console.error('init_point não encontrado:', responseData);
        return;
      }

      Linking.openURL(responseData.init_point);
      Alert.alert('Sucesso', 'Pagamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao finalizar pagamento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao finalizar o pagamento.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plano {planId}</Text>
        <TouchableOpacity onPress={handleFinalizarPagamento}>
          <Ionicons size={32} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Escolha o seu plano de assinatura</Text>
      <Text style={styles.description}>Acesso ilimitado a todos os recursos</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinalizarPagamento}>
        <Text style={styles.buttonText}>Realizar Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Planos;
