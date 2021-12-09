import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoNewsHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '1d21fab12cmsh37100c63db4d8f1p12074bjsn56b68d01e96f'
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
const createRequest = (url)=>({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder) =>({
        getCryptoNews: builder.query({
            query: (newsCategory)=> createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day`),
        })
    })
})

export const {useGetCryptoNewsQuery} =cryptoNewsApi;
