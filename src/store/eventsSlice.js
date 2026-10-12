import { createSlice } from '@reduxjs/toolkit';
import { MOCK_EVENTS } from '../data/events';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: MOCK_EVENTS.map(event => ({ ...event, comments: [] })), 
  },
  reducers: {
    addEvent: (state, action) => {
      state.items.unshift({ ...action.payload, comments: [] });
    },
    deleteEvent: (state, action) => {
      state.items = state.items.filter(event => event.id !== action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.items.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    addComment: (state, action) => {
      const { eventId, text, author, role, date } = action.payload;
      const event = state.items.find(e => e.id === eventId);
      if (event) {
        if (!event.comments) event.comments = [];
        event.comments.push({ id: Date.now(), text, author, role, date });
      }
    }
  }
});

export const { addEvent, deleteEvent, updateEvent, addComment } = eventsSlice.actions;
export default eventsSlice.reducer;
