import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './components/pages/Home.js';
import Header from './components/Header.js';
import Dashboard from './components/pages/Dashboard.js';
import Login from './components/pages/Login.js';
import Signup from './components/pages/Signup.js';
import Flight from './components/pages/Flight.js';
import Footer from './components/Footer.js';
import NotSignedIn from './components/pages/NotSignedIn.js';
import Result from './components/pages/Result.js';
import ResultHistory from './components/pages/ResultHistory.js';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flights" element={<Flight />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/signedout" element={<NotSignedIn />} />
            <Route path="/results/:user" element={<ResultHistory />} />
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App;
