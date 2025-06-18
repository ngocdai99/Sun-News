import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
  Pressable,
} from 'react-native';
import * as yup from 'yup';
import {Toaster} from '~/utils/toaster.ts';
import {colors, ScreenName} from '~/constants';
import {NormalInput, NormalText, PrimaryButton, Row} from '~/components';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .required('This field should not be empty'),
  password: yup
    .string()
    .min(6, 'Tối thiểu 6 ký tự')
    .required('This field should not be empty'),
});

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('ngocdaibui99@gmail.com');
  const [password, setPassword] = useState('123456');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validate = async () => {
    try {
      await schema.validate({email, password}, {abortEarly: false});
      setErrors({});
      return true;
    } catch (err: any) {
      const formErrors: any = {};
      err.inner.forEach((error: any) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const onSubmit = async () => {
    const isValid = await validate();
    if (!isValid) return;

    Toaster.toast.show({
      message: 'You have been logged in',
    });
    navigation.reset({
      index: 0,
      routes: [{name: ScreenName.BottomTab}],
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('~/assets/images/splash_screen.png')}>
      <View style={styles.inner}>
        <NormalInput
          required
          label="Email"
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
          placeholder=""
          validationMessage={errors.email ? errors.email : ''}
        />

        <NormalInput
          required
          label="Password"
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
          placeholder=""
          validationMessage={errors.password ? errors.password : ''}
        />
        <PrimaryButton title="Sign in" onPress={onSubmit} />

        <Pressable>
          <NormalText text="Forgot Password?" />
        </Pressable>

        <Row>
          <Text>Don't have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate(ScreenName.SignUpScreen)}>
            <Text style={styles.signUp}> Sign Up</Text>
          </Pressable>
        </Row>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signUp: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  support: {
    textAlign: 'center',
    marginTop: 16,
    color: '#333',
  },
});

export default LoginScreen;
