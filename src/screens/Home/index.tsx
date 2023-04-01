import React, { useEffect, useState } from "react";
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
// import {CarDetails} from '../CarDetails'
import api from "../../services/api";
import { Car } from "../../components/Car";
import Logo from '../../assets/logo.svg';
import { CarDTO } from "../../dtos/CarDTO";


// import { PropsStack } from '../../routes/app.stack.routes';

import { ActivityIndicator, FlatList, View, Text } from 'react-native';
type Car = {
  id: string;
  name: string;
  brand: string;
};

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }
  const theme = useTheme();
  useEffect(() => {
    async function fetchCars() {
        try {
          const response = await api.get('/cars');
          var cars_update = response.data.map((car: CarDTO) => {
            var new_car = car.photos?.map((photo, i) => {
              return {
                "photo": photo,
                "id":  String(i+1)
              }
            }) 
            car.photos = [...new_car];
            return car
          })

          setCars(cars_update);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {isLoading ? <ActivityIndicator /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Car data={item} onPress={() => handleCarDetails(item)} />
          }
        />
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}


