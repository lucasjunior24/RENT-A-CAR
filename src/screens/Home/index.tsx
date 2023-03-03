import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import api from "../../services/api";
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Car } from "../../components/Car";

import { CarDTO } from "../../dtos/CarDTO";

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

export default function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setLoading] = useState(true);

  function handleOpenMyCars() {
    console.log("clicou")
  }

  function handleCarDetails(car: CarDTO) {
    console.log("car")
  }


  const theme = useTheme();
  useEffect(() => {
    async function fetchCars() {
        try {
          const response = await api.get('/cars');
          setCars(response.data);
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
          {/* <Logo width={108} height={12} /> */}
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

  // return ( 
  //   <View style={{
  //     flex: 1,
  //     flexDirection: 'row',
  //     alignItems: 'center', justifyContent: "center"
  //      }}>
  //     <StatusBar
  //       // barStyle="light-content"
  //       // backgroundColor='transparent'
  //       translucent
  //     />
  //     {isLoading ? (
  //       <ActivityIndicator />
  //     ) : (
  //       <FlatList
  //         style={{
  //           flexDirection: 'column',
  //           // alignSelf: 'center', 
  //           width: 150,
  //           backgroundColor: "red",
    
  //         }}
  //         data={cars}
  //         keyExtractor={item => item.id}
  //         renderItem={({item}) =>
  //         (
  //           <Text style={{
  //             flexDirection: 'row',
  //             alignSelf: 'center', 
  //             justifyContent: 'center',
  //             backgroundColor: "blue",
  //             // fontSize: 19
  //            }}>
  //             {item.name},  {item.brand}
  //           </Text>
  //         )}
  //       />
  //       )}
  //   </View>
  // );
}


