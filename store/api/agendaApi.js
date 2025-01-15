import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const agendaApi = createApi({
    reducerPath: 'agendApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL,
    }),
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        getAllEvents: builder.query({
            providesTags: ['Events'],
            query: (token) => 'events.json?auth=' + token,
            transformResponse: (response) => {
                const events = [];
                for (const key in response) {
                    const event = {
                        id: key,
                        ...response[key],
                    };
                    events.push(event);
                }
                return events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            },
            transformErrorResponse: (error) => {
                console.log(error);

                return "Une erreur s'est produite. Veuillez ré-essayer ultérieurement";
            },
        }),
        createEvent: builder.mutation({
            invalidatesTags: ['Events'],
            query: ({ event, token }) => ({
                url: `events.json?auth=` + token,
                method: 'POST',
                body: event,
            }),
        }),
        updateEvent: builder.mutation({
            invalidatesTags: ['Events'],
            query: ({ id, event, token }) => ({
                url: `events/${id}.json?auth=` + token,
                method: 'PATCH',
                body: event,
            }),
        }),
        deleteEvent: builder.mutation({
            invalidatesTags: ['Events'],
            query: ({ id, token }) => {
                return {
                    url: `events/${id}.json?auth=` + token,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

export const { useGetAllEventsQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation } = agendaApi;
