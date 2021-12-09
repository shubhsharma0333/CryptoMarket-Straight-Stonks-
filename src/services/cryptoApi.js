import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '1d21fab12cmsh37100c63db4d8f1p12074bjsn56b68d01e96f'
}

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url)=>({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder) =>({
        getCryptos: builder.query({
            query: ()=> createRequest(`/coins`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
          }),
    })
    
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;
