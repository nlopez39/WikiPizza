const typeDefs = `
type BlogPost {
    _id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String
    updatedAt: String
  
    
}
type Users {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
}
type Auth {
    token: ID!
    user :User
}

type Query {
    blogPosts : [BlogPost]
    users : [Users]
}
type Mutation{
    signup(firstname:String!, lastname:String!, email:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addBlogPost(title: String!, content:String!, author:String!): BlogPost
    deleteBlogPost(_id:ID!): BlogPost
    updateBlogPost(_id: ID!, title: String!,content: String!): BlogPost
   
}
`;
module.exports = typeDefs;
