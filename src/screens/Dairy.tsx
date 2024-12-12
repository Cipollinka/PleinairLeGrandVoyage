import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BottomNavigation from '@/components/BottomNavigation';
import Row from '@/components/layout/Row';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Button from '@/components/ui/Button';
import {useUserStore} from '@/stores/userStore';
import AddJournalNote from '@/components/modals/AddJournalNote';
import {JournalNotes} from '@/types';
import PlusIcon from '@/assets/icons/plus.svg';

import UmbrellaIcon from '@/assets/icons/umbrella.svg';

export default function Dairy() {
  const notes = useUserStore(state => state.journalNotes);
  const isNotesExist = notes.length > 0;
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<JournalNotes | null>(null);

  const journalNotesExploredLocations = useUserStore(
    state => state.journalNotesExploredLocations,
  );
  const addJournalNotesExploredLocation = useUserStore(
    state => state.addJournalNotesExploredLocation,
  );

  const handleExploredLocation = (journalNotes: JournalNotes) => {
    addJournalNotesExploredLocation(journalNotes.id);
  };

  const onClose = () => {
    setCurrentNote(null);
    setIsNotesModalOpen(false);
  };

  const handleNoteClick = (note: JournalNotes) => {
    setCurrentNote(note);
    setIsNotesModalOpen(true);
  };

  return (
    <BackgroundWrapper>
      <AddJournalNote
        isOpen={isNotesModalOpen}
        onClose={onClose}
        currentNote={currentNote}
        onExploredLocation={handleExploredLocation}
        isExplored={
          currentNote && journalNotesExploredLocations.includes(currentNote.id)
        }
      />

      <Row
        gap={10}
        style={{
          padding: 16,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.1,
          shadowRadius: 9,
          backgroundColor: '#fff',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <CustomText fw="bold" fs={20}>
          My Journal
        </CustomText>

        <Button
          icon={<PlusIcon width={25} height={25} />}
          title="Add Note"
          onPress={() => setIsNotesModalOpen(true)}
        />
      </Row>

      <Container>
        <View style={{width: '100%', alignItems: 'center'}}>
          {!isNotesExist && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10%',
              }}>
              <CustomText fs={22} style={{textAlign: 'center'}}>
                You have no notes yet, you can add one by clicking on the button
                above.
              </CustomText>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            {isNotesExist && (
              <Row
                gap={15}
                style={{
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginBottom: 50,
                }}>
                {notes.map(note => {
                  const isExplored = journalNotesExploredLocations.includes(
                    note.id,
                  );

                  return (
                    <TouchableOpacity
                      key={note.id}
                      style={{position: 'relative'}}
                      onPress={() => handleNoteClick(note)}>
                      <View
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 0},
                          shadowOpacity: 0.3,
                          shadowRadius: 9,
                        }}>
                        {isExplored && (
                          <View
                            style={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              zIndex: 20,
                            }}>
                            <UmbrellaIcon
                              width={20}
                              height={20}
                              fill="gold"
                              stroke={'gold'}
                            />
                          </View>
                        )}
                        <Image
                          source={{uri: note.image}}
                          style={{width: 160, height: 150, borderRadius: 24}}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </Row>
            )}
          </ScrollView>
        </View>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
