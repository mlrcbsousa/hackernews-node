const { GraphQLServer } = require('graphql-yoga')

// dummy data

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
    // link: (parent, args) => links.find(l => l.id === args.id)
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url
        description: args.description,
      });
    },
    // updateLink: (parent, args) => {
    //   const link = links.find(link => link.id === args.id);
    //   for (const arg in args) {
    //     if (args[arg] && arg !== "id") { link[arg] = args[arg] };
    //   };
    //   return link;
    // },
    // deleteLink: (parent, args) => {
    //   const index = links.findIndex(l => l.id === args.id);
    //   const link = links[index];
    //   links.splice(index, 1);
    //   return link;
    // }
  }
}

// yoga server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
