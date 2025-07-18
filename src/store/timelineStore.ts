import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TimelineEvent {
  id: string;
  name: string;
  date: string;
  category: 'performances' | 'homework' | 'charity';
  location?: string;
  time?: string;
  attendees?: string;
  performers?: string;
  duration?: string;
  description?: string;
  photo?: string | null;
  createdAt: string;
  createdBy: string;
}

interface TimelineState {
  events: TimelineEvent[];
  addEvent: (eventData: Omit<TimelineEvent, 'id' | 'createdAt'>) => TimelineEvent;
  removeEvent: (eventId: string) => void;
  updateEvent: (eventId: string, updates: Partial<TimelineEvent>) => void;
  getEventsByCategory: (category: TimelineEvent['category']) => TimelineEvent[];
  getEventById: (eventId: string) => TimelineEvent | undefined;
}

export const useTimelineStore = create<TimelineState>()(
  persist(
    (set, get) => ({
      events: [],

      addEvent: (eventData) => {
        const newEvent: TimelineEvent = {
          ...eventData,
          id: `event-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          events: [...state.events, newEvent].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        }));
        
        return newEvent;
      },

      removeEvent: (eventId) => {
        set(state => ({
          events: state.events.filter(event => event.id !== eventId)
        }));
      },

      updateEvent: (eventId, updates) => {
        set(state => ({
          events: state.events.map(event => 
            event.id === eventId ? { ...event, ...updates } : event
          )
        }));
      },

      getEventsByCategory: (category) => {
        const { events } = get();
        return events
          .filter(event => event.category === category)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      getEventById: (eventId) => {
        const { events } = get();
        return events.find(event => event.id === eventId);
      },
    }),
    {
      name: 'onekey-timeline',
      partialize: (state) => ({
        events: state.events,
      }),
    }
  )
); 