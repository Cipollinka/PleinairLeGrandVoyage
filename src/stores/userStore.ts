import {JournalNotes, UserAccount} from '@/types';
import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  isGuest: boolean;
  setIsGuest: (isGuest: boolean) => void;

  userAccounts: UserAccount[];
  addUserAccount: (userAccount: UserAccount) => void;

  username: string;
  setUsername: (username: string) => void;

  password: string;
  setPassword: (password: string) => void;

  avatar: string;
  setAvatar: (avatar: string) => void;

  score: number;
  addScore: (score: number) => void;
  substractScore: (score: number) => void;

  catalogExploredLocations: number[];
  addCatalogExploredLocation: (catalogExploredLocation: number) => void;

  planningTripExploredLocations: number[];
  addPlanningTripExploredLocation: (
    planningTripExploredLocation: number,
  ) => void;

  journalNotesExploredLocations: number[];
  addJournalNotesExploredLocation: (
    journalNotesExploredLocation: number,
  ) => void;

  journalNotes: JournalNotes[];
  addJournalNote: (journalNotes: Omit<JournalNotes, 'id'>) => void;
  removeJournalNote: (id: number) => void;
  editJournalNote: (journalNotes: JournalNotes) => void;

  currentDayGameIndex: number;
  setCurrentDayGameIndex: (index: number) => void;

  clear: () => void;
  reset: () => void;
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      isGuest: false,
      setIsGuest: isGuest => set({isGuest}),

      userAccounts: [],
      addUserAccount: userAccount => {
        const accounts = [...get().userAccounts, userAccount];
        set({userAccounts: accounts});
      },

      username: '',
      setUsername: (username: string) => set({username}),

      password: '',
      setPassword: (password: string) => set({password}),

      avatar: '',
      setAvatar: (avatar: string) => set({avatar}),

      score: 0,
      addScore: (score: number) => set({score: get().score + score}),
      substractScore: (score: number) => set({score: get().score - score}),

      catalogExploredLocations: [],
      addCatalogExploredLocation: (catalogExploredLocation: number) =>
        set({
          catalogExploredLocations: [
            ...get().catalogExploredLocations,
            catalogExploredLocation,
          ],
        }),

      planningTripExploredLocations: [],
      addPlanningTripExploredLocation: (planningTripExploredLocation: number) =>
        set({
          planningTripExploredLocations: [
            ...get().planningTripExploredLocations,
            planningTripExploredLocation,
          ],
        }),

      journalNotesExploredLocations: [],
      addJournalNotesExploredLocation: (journalNotesExploredLocation: number) =>
        set({
          journalNotesExploredLocations: [
            ...get().journalNotesExploredLocations,
            journalNotesExploredLocation,
          ],
        }),

      journalNotes: [],
      addJournalNote: journalNotes => {
        const notes = get().journalNotes;
        const lastId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 0;
        set({
          journalNotes: [...notes, {...journalNotes, id: lastId}],
        });
      },
      removeJournalNote: id => {
        const notes = get().journalNotes;
        const filtered = notes.filter(item => item.id !== id);
        set({journalNotes: filtered});
      },
      editJournalNote: journalNotes => {
        const notes = [...get().journalNotes];
        const index = notes.findIndex(item => item.id === journalNotes.id);
        notes[index] = journalNotes;
        set({
          journalNotes: notes,
        });
      },

      currentDayGameIndex: 0,
      setCurrentDayGameIndex: index => {
        set({
          currentDayGameIndex: index,
        });
      },

      clear: () => {
        set({
          userAccounts: [],
          username: '',
          password: '',
          avatar: '',
          score: 0,
          catalogExploredLocations: [],
          planningTripExploredLocations: [],
          journalNotesExploredLocations: [],
          journalNotes: [],
          currentDayGameIndex: 0,
          isGuest: false,
        });
      },
      reset: () => {
        set({
          score: 0,
          catalogExploredLocations: [],
          planningTripExploredLocations: [],
          journalNotesExploredLocations: [],
          journalNotes: [],
          currentDayGameIndex: 0,
        });
      },
    }),

    getPersistStoreOptions('user'),
  ),
);
