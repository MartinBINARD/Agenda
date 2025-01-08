import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agendaApi = createApi({
  reducerPath: "agendaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "events.json",
      transformResponse: (response) => {
        const events = [];
        for(const key in response) {
          const event = {
            id: key,
            ...response[key]
          }
          events.push(event);
        }

        return events.sort((a,b) => new Date(a.startDate) - new Date(b.startDate));
      },
      transformErrorResponse: () => "Une erreur s'est produite. Veuillez ré-essayer ultérieurement",
    }),
  }),
});

export const { useGetAllEventsQuery } = agendaApi;