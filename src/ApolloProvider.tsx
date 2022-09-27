import React from 'react';
import App from './App';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink: any = createHttpLink({
    uri: 'https://server-social-network-app.herokuapp.com/graphql'
})

const authorizationLink: any = setContext(()=>{
    const token = localStorage.getItem("access-token");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}`:'',
        }
    }
})

const client = new ApolloClient({
    link: authorizationLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);