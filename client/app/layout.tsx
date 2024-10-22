"use client";
import { NavLinks } from '@/app/ui/nav-links'
import 'bootstrap/dist/css/bootstrap.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: 'include', 

});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// Put any other imports below so that CSS from your
// components takes precedence over default styles.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ApolloProvider client={client}>
    <html lang="en">
      <body>
        <NavLinks/>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
    </ApolloProvider>
  )
}