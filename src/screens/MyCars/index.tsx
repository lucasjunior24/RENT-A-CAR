import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { 
    Container, 
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from './styles'

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const screensIsFocus = useIsFocused();

    const navigation = useNavigation();
    const theme = useTheme();
    
    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetCars() {
            try {
                const response = await api.get('/rentals');
                const dataFormatted = response.data.map((data: CarProps) => {
                  return {
                    id: data.id,
                    car: data.car,
                    start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                    end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                  }
                });
                setCars(dataFormatted);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetCars();
    }, [screensIsFocus]);
    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor='transparent'
                />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape} />

                <Title>
                    Escolha uma {'\n'}
                    data de inicio e {'\n'}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            </Header>
            
            { loading ? <Load /> :  
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList 
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                        <CarWapper>
                            <Car data={item.car} />
                            <CarFooter>
                                <CarFooterTitle>Periodo</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.start_date}</CarFooterDate>
                                    <AntDesign  
                                        name='arrowright'
                                        size={20}
                                        color={theme.colors.title}
                                        style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWapper> 
                        )}
                    />
                </Content>
            }
        </Container>
    )
}
