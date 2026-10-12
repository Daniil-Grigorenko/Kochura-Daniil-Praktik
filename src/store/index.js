import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import registrationsReducer from './registrationsSlice';
import eventsReducer from './eventsSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    registrations: registrationsReducer,
    events: eventsReducer,
  },
});
