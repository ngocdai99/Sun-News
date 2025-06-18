import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import {Column} from '~/components';
import LabelInput from '~/components/inputs/LabelInput';
import {colors, GLOBAL_KEYS} from '~/constants';


interface NormalInputProps extends TextInputProps {
  required: boolean;
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  validationMessage?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
}

export const NormalInput: React.FC<NormalInputProps> = ({
  required = false,
  label = '',
  placeholder = '',
  value,
  onChangeText,
  validationMessage,
  secureTextEntry = false,
  style = {},
  editable = true,
  keyboardType = 'default',
  onSubmitEditing,
  returnKeyType = 'done',
  autoFocus = false,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const shouldShowEyeIcon = secureTextEntry;

  return (
    <Column style={[styles.container, style]}>
      {label && (
        <LabelInput label={label} required={required} style={{fontSize: 14}} />
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray400}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={editable}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          autoFocus={autoFocus}
          style={[styles.input, shouldShowEyeIcon && {paddingRight: 36}]}
        />

        {shouldShowEyeIcon && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'} 
              size={24}
              color={colors.gray400}
            />
          </TouchableOpacity>
        )}
      </View>

      {validationMessage ? (
        <Text style={styles.validationText}>{validationMessage}</Text>
      ) : null}
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    position: 'relative',
  },
  input: {
    fontSize: 14,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '25%',
  },
  validationText: {
    color: colors.red800,
    fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
    marginTop: 4,
  },
});
