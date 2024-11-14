const typeDefs = `
type BlogPost {
    _id: ID!
    title: String!
    content: String!
    author: User
    createdAt: String
    updatedAt: String
  
    
}
type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    blogposts: [BlogPost]
}
type Auth {
    token: ID!
    user :User
}

type Query {
    blogPosts : [BlogPost]
    users : [User]
    singleuser(_id:ID!) : User
}
type Mutation{
    signup(firstname:String!, lastname:String!, email:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addBlogPost(title: String!, content:String!): BlogPost
    deleteBlogPost(_id:ID!): BlogPost
    updateBlogPost(_id: ID!, title: String!,content: String!): BlogPost
   
}
`;
module.exports = typeDefs;
