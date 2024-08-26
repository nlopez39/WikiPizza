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
type Mutation{
    addBlogPost(title: String!, content:String!, author:String!): BlogPost
   
}
`;
module.exports = typeDefs;
