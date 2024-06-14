import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'
import { ICalculator } from '../interfaces/calculator.interface'

export const calculatorAPI = createApi({
  reducerPath: 'calculatorAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/calculator',
    prepareHeaders: (headers, { getState }) => {
      console.log('israel', (getState() as RootState).authReducer)
      const { access_token } = (getState() as RootState).authReducer
      console.log('calculatorAPI:: prepareHeaders access_token:', access_token)
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    division: build.mutation<any, ICalculator>({
      query: ({paramA, paramB}) => ({
        url: `division`,
        method: 'POST',
        body: {paramA, paramB},
      }),
    }),
    addition: build.mutation<any, ICalculator>({
      query: ({paramA, paramB}) => ({
        url: `addition`,
        method: 'POST',
        body: {paramA, paramB},
      }),
    }),
    multiplication: build.mutation<any, ICalculator>({
      query: ({paramA, paramB}) => ({
        url: `multiplication`,
        method: 'POST',
        body: {paramA, paramB},
      }),
    }),
    subtraction: build.mutation<any, ICalculator>({
      query: ({paramA, paramB}) => ({
        url: `subtraction`,
        method: 'POST',
        body: {paramA, paramB},
      }),
    }),
  }),
})
export const { useDivisionMutation, useAdditionMutation, useMultiplicationMutation, useSubtractionMutation } = calculatorAPI
