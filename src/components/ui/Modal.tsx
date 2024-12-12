import React from 'react';
import {View, Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native';

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal = ({isVisible, children, onClose}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    width: '90%',
    borderRadius: 31,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 'auto',
    maxHeight: '80%',
    flex: 1,
  },
});

export default CustomModal;
