import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    {
      id: "dummyId",
      title: "My title",
      location: "Au bureau",
      phoneNumber: "0638509478",
      description: "Réunion React Native",
      startDate: "2026-11-24T10:30:00",
      endDate: "2026-11-24T11:30:00",
      isOnline: false,
    },
    {
      id: "dummyIde",
      title: "My title - 2",
      location: "https://dyma.com/fr/react-native",
      phoneNumber: "0638509478",
      description:
        "Réunion React Native concernant les formulaires parce qu'une app sans formulaire ça n'existe pas",
      startDate: "2026-11-25T10:30:00",
      endDate: "2026-11-25T11:30:00",
      isOnline: true,
    },
  ],
};

export const agendaSlice = createSlice({
  name: "agenda",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload]
    },
    updateEvent: (state, action) => {
      const index = state.events.indexOf(state.events.find(evt => evt.id === action.payload.id));
      state.events[index] = action.payload;
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(evt => evt.id !== action.payload.id);
    }
  },
});

export const { addEvent, updateEvent, removeEvent } = agendaSlice.actions;
export default agendaSlice.reducer;