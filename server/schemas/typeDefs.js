const typeDefs = `
type BlogPost {
    _id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String
    updatedAt: String
  
    
}

type Query {
    blogPosts : [BlogPost]
}
type Mutation{
    addBlogPost(title: String!, content:String!, author:String!): BlogPost
    deleteBlogPost(_id:ID!): BlogPost
    updateBlogPost(_id: ID!, title: String!,content: String!): BlogPost
   
}
`;
module.exports = typeDefs;
