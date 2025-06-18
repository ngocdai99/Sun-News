import React, {useState} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {heightScreen, initTop, widthScreen} from '../../utils/scale.ts';
import {Toaster} from '~/utils/toaster.ts';

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      <Button
        title="Show Toast Message"
        onPress={() =>
          Toaster.message.show({
            title: 'Login successfully',
            message: 'You have been logged in',
          })
        }
      />

       <Button
        title="Show Toast"
        onPress={() =>
          Toaster.toast.show({
            message: 'You have been logged in',
          })
        }
      />
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={styles.modalStyle}
        isVisible={modalVisible}>
        <Text marginB-15>Hello World!</Text>

        <Button title="Hide Modal" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    gap: 16,
    paddingTop: 100
  },
  modalStyle: {
    margin: 0,
    padding: 16,
    backgroundColor: 'white',
    paddingTop: initTop * 2,
    height: heightScreen,
    width: widthScreen * 0.8,
    alignSelf: 'flex-start',
  },
});

export default HomeScreen;
