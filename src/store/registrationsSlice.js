import { createSlice } from '@reduxjs/toolkit';

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: { items: [] },
  reducers: {
    registerForEvent: (state, action) => {
      const event = action.payload;
      if (!state.items.find(item => item.id === event.id)) {
        state.items.push(event);
      }
    },
    cancelRegistration: (state, action) => {
      const eventId = action.payload;
      state.items = state.items.filter(item => item.id !== eventId);
    }
  }
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;
