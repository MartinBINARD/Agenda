import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_AUTH_URL,
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({ email, password }) => ({
                url: `:signUp?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
                method: 'POST',
                body: {
                    email,
                    password,
                    returnSecureToken: true,
                },
            }),
        }),
    }),
});

export const { useSignUpMutation } = authApi;
