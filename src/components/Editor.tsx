import React from 'react';
import {useEditorBridge, RichText, Toolbar} from '@10play/tentap-editor';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

export const BasicEditor = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: 'Start editing!',
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{position: 'absolute', width: '100%', bottom: 0}}>
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
