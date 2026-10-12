import { describe, it, expect } from 'vitest';
import eventsReducer, { addEvent, deleteEvent } from './eventsSlice';
import registrationsReducer, { registerForEvent, cancelRegistration } from './registrationsSlice';

describe('Backend / Redux Logic', () => {
  describe('eventsSlice', () => {
    it('should handle addEvent', () => {
      const initialState = { items: [] };
      const newEvent = { id: 999, title: 'Test Event' };
      const nextState = eventsReducer(initialState, addEvent(newEvent));
      expect(nextState.items.length).toBe(1);
      expect(nextState.items[0].title).toBe('Test Event');
    });

    it('should handle deleteEvent', () => {
      const initialState = { items: [{ id: 1, title: 'To be deleted' }, { id: 2, title: 'Keep' }] };
      const nextState = eventsReducer(initialState, deleteEvent(1));
      expect(nextState.items.length).toBe(1);
      expect(nextState.items[0].id).toBe(2);
    });
  });

  describe('registrationsSlice', () => {
    it('should handle registerForEvent', () => {
      const initialState = { items: [] };
      const nextState = registrationsReducer(initialState, registerForEvent({ id: 10, title: 'Registered' }));
      expect(nextState.items.length).toBe(1);
      expect(nextState.items[0].id).toBe(10);
    });

    it('should handle cancelRegistration', () => {
      const initialState = { items: [{ id: 10, title: 'Registered' }] };
      const nextState = registrationsReducer(initialState, cancelRegistration(10));
      expect(nextState.items.length).toBe(0);
    });
  });
});
