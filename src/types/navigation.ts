import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screens {
  CREATE_ACCOUNT = 'createAccount',
  MAIN_MENU = 'mainMenu',
  CATALOG = 'catalog',
  PLANNING_TRIP = 'planningTrip',
  DAIRY = 'dairy',
  QUIZ = 'quiz',
  BACKPACK = 'BACKPACK',
  PICK_GAME = 'PICK_GAME',
  GAME = 'game',
  SETTINGS = 'settings',
  ARTICLE = 'ARTICLE',
  ARTICLE_DETAILS = 'ARTICLE_DETAILS',
}

export type RootStackParamList = {
  [Screens.CREATE_ACCOUNT]: undefined;
  [Screens.MAIN_MENU]: undefined;
  [Screens.CATALOG]: undefined;
  [Screens.PLANNING_TRIP]: undefined;
  [Screens.DAIRY]: undefined;
  [Screens.QUIZ]: undefined;
  [Screens.BACKPACK]: undefined;
  [Screens.PICK_GAME]: undefined;
  [Screens.GAME]: {isDaily?: boolean};
  [Screens.ARTICLE]: undefined;
  [Screens.SETTINGS]: undefined;
  [Screens.ARTICLE_DETAILS]: {
    id: number;
  };
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
