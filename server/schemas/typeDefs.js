const typeDefs = `
type BlogPost {
    id: ID!
    title: String!
    content: String!
    author: String!
    date: String!
    
}

type Query {
    blogPosts : [BlogPost]
}
`;
module.exports = typeDefs;
