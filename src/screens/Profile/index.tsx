import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import  * as Yup from 'yup';
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

import api  from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';

export function Profile() {
  const { user, signOut } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState('https://avatars.githubusercontent.com/u/53240060?v=4');
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  
  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // if(result.cancelled) return;
    // if(result.uri) setAvatar(result.uri);
  }

  async function handleProfileUpdate() {
    // try {
    //   const schema = Yup.object().shape({
    //     driverLicense: Yup.string()
    //     .required('CNH é obrigatorio!'),
    //     name: Yup.string()
    //     .required('Nome é obrigatorio!'),
    //   });

    //   // const data = { name, driverLicense };
    //   await schema.validate(data);

    //   await api.put('/users', {
    //     name,
    //     email: user.email,
    //     driver_license: driverLicense,
    //     avatar
    //   })
    //   .then(() => {
    //     navigation.navigate('Confirmation', {
    //       nextScreenRoute: 'Home',
    //       title: 'Conta Atualizada',
    //       message: `Agora é só Aproveitar`
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     Alert.alert('Opa', 'Não foi possivel atualizar conta');
    //   });

    // } catch (error) {
    //   if(error instanceof Yup.ValidationError) {
    //     Alert.alert("Opa" , error.message);
    //   } else {
    //     Alert.alert("Não foi possível atualizar o perfil");
    //   }
    // }
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar se conectar novamente.',
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: "Sair",
          onPress: () => signOut()
        }
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut} >
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ?
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  // defaultValue={user.name}
                  // onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  // defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  autoCorrect={false}
                  keyboardType="numeric"
                  // defaultValue={user.driver_license}
                  // onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir nova senha'
                />
              </Section>
            }

            <Button 
              title='Salvar alterações'
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}