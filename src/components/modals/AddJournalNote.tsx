import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomModal from '../ui/Modal';
import {JournalNotes} from '@/types';
import CustomText from '../ui/Text';

import CloseIcon from '@/assets/icons/close.svg';
import Row from '../layout/Row';
import Button from '../ui/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageIcon from '@/assets/icons/image.svg';
import {useUserStore} from '@/stores/userStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentNote: JournalNotes | null;
  onExploredLocation: (journalNotes: JournalNotes) => void;
  isExplored: boolean;
}

export default function AddJournalNote({
  isOpen,
  onClose,
  currentNote,
  onExploredLocation,
  isExplored,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [comment, setComment] = useState('');

  const addJournalNote = useUserStore(state => state.addJournalNote);
  // const removeJournalNote = useUserStore(state => state.removeJournalNote);
  const editJournalNote = useUserStore(state => state.editJournalNote);

  useEffect(() => {
    if (isOpen && !currentNote) {
      setIsEdit(true);
      setAvatar('');
      setComment('');
    } else if (isOpen && currentNote) {
      setIsEdit(false);
      setAvatar(currentNote?.image);
      setComment(currentNote?.description);
    }
  }, [isOpen, currentNote]);

  const handleClose = () => {
    setComment('');
    setAvatar('');
    setIsEdit(false);
    onClose();
  };

  const handleSave = () => {
    if (!avatar || !comment) {
      Alert.alert('Please add an image and a comment');
      return;
    }
    if (isEdit && currentNote) {
      editJournalNote({
        id: currentNote.id,
        image: avatar,
        description: comment,
      });
      handleClose();
      return;
    }
    addJournalNote({
      image: avatar,
      description: comment,
    });
    handleClose();
  };

  const handleSelectAvatar = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        selectedImageUri && setAvatar(selectedImageUri);
      }
    });
  };

  const handleEdit = () => {
    if (!currentNote) return;

    setAvatar(currentNote?.image);
    setComment(currentNote?.description);
    setIsEdit(true);
  };

  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
          width: '100%',
        }}>
        <Row style={{marginBottom: 10, justifyContent: 'space-between'}}>
          <CustomText fw="bold" fs={24}>
            {isEdit ? 'Edit Note' : 'Add Note'}
          </CustomText>

          <CloseIcon width={20} height={20} onPress={onClose} />
        </Row>

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleSelectAvatar}>
            {avatar ? (
              <Image source={{uri: avatar}} style={styles.avatar} />
            ) : (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 24,
                  width: 260,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageIcon width={100} height={70} fill="#000" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          {isEdit ? (
            <TextInput
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
              style={{
                height: 100,
                width: '100%',
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 16,
                borderRadius: 10,
              }}
              numberOfLines={20}
            />
          ) : (
            <CustomText fs={18}>Note: {currentNote?.description}</CustomText>
          )}
        </View>

        <Row
          style={{
            marginTop: 20,
            justifyContent: 'center',
            width: currentNote ? '70%' : '100%',
            marginHorizontal: 'auto',
          }}
          gap={10}>
          {currentNote && !isEdit && (
            <Button title="Edit" isFullWidth onPress={handleEdit} />
          )}
          {currentNote && !isEdit && !isExplored && (
            <Button
              title="Explored the location"
              onPress={() => onExploredLocation(currentNote)}
            />
          )}
          {(!currentNote || isEdit) && (
            <Button title="Save" isFullWidth onPress={handleSave} />
          )}
        </Row>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 260,
    height: 150,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  avatarContainer: {
    alignItems: 'center',
    width: 260,
    height: 150,
    marginHorizontal: 'auto',
  },
});
