import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import * as yup from 'yup';
import {NormalInput, NormalText, PrimaryButton, Row} from '~/components';
import {colors, ScreenName} from '~/constants';
import {Toaster} from '~/utils/toaster.ts';
import {register} from '~/services/auth';
import {useMutation} from 'react-query';

const schema = yup.object().shape({
  name: yup.string().required('Trường này không được để trống'),
  email: yup
    .string()
    .email('Email is not valid')
    .required('Trường này không được để trống'),
  password: yup
    .string()
    .min(6, 'Tối thiểu 6 ký tự')
    .required('Trường này không được để trống'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Trường này không được để trống'),
});

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('Dai Ngoc');
  const [email, setEmail] = useState('ngocdaibui99@gmail.com');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = async () => {
    try {
      await schema.validate(
        {name, email, password, confirmPassword},
        {abortEarly: false},
      );
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

  const registerFn = useMutation({
    mutationFn: (data: {name: string; email: string; password: string}) =>
      register(data),
    onSuccess: () => {
      Toaster.toast.show({
        message: 'Register successfully',
      });
      navigation.navigate(ScreenName.LoginScreen);
    },
    onError: (error: any) => {
      console.log('register error', error.response.data);
      Toaster.message.show({
        type: 'danger',
        title: 'Register Error',
        message: error.response.data.message || 'Có lỗi xảy ra',
      });
    },
  });

  const onSubmit = async () => {
    const isValid = await validate();
    if (!isValid) return;
    await registerFn.mutateAsync({name, email, password});
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('~/assets/images/splash_screen.png')}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.inner}>
            <NormalInput
              required
              label="Name"
              onChangeText={text => {
                setName(text);
              }}
              value={name}
              placeholder=""
              validationMessage={errors.name ? errors.name : ''}
            />
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
              secureTextEntry
              validationMessage={errors.password ? errors.password : ''}
            />
            <NormalInput
              required
              label="Confirm Password"
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              value={confirmPassword}
              placeholder=""
              secureTextEntry
              validationMessage={
                errors.confirmPassword ? errors.confirmPassword : ''
              }
            />
            <PrimaryButton
              disabled={registerFn.isLoading}
              title="Sign up"
              onPress={onSubmit}
            />

            <Row>
              <Text>Already have an account?</Text>
              <Pressable
                onPress={() => navigation.navigate(ScreenName.LoginScreen)}>
                <Text style={styles.signUp}> Sign in</Text>
              </Pressable>
            </Row>

            <NormalText text="Contact support via email: sunnews@gmail.com" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 32,
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

export default SignUpScreen;
