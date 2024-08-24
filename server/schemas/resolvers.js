const resolvers = {
  Query: {
    blogPosts: () => [
      {
        id: 1,
        title: "The Best Pizza Dough Recipe",
        content: "This is a foolproof pizza dough recipe...",
        author: "John Doe",
        date: "2024-08-19",
      },
      {
        id: 2,
        title: "Top 5 Pizza Toppings You Should Try",
        content: "From pepperoni to anchovies...",
        author: "Jane Smith",
        date: "2024-08-20",
      },
    ],
  },
};
module.exports = resolvers;
