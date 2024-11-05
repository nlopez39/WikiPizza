"use client";
import { NavLinks } from '@/app/ui/nav-links'
import 'bootstrap/dist/css/bootstrap.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql, 
  useMutation
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";



// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: 'include', 
});

// Set up middleware to attach the JWT token from localStorage to every request
const authLink = setContext((_, { headers }) => {
  console.log("authLink executed");  // Debugging: Check if this is reached
  // Access token from localStorage only on the client side
  const token = typeof window !== "undefined" ? localStorage.getItem("id_token") : null;
  
  console.log("Token retrieved:", token);  // Debugging: Check token retrieval

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Use `authLink` to add token to requests, followed by the main httpLink
 
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
console.log("client", client);



// Root layout component
export default function RootLayout({
 
  children,
}: {
  children: React.ReactNode
}) {
  console.log("RootLayout printed");
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body>
          <NavLinks />
          {/* Layout UI */}
         
 
          <main>{children}</main>
        </body>
      </html>
    </ApolloProvider>
  );
}
