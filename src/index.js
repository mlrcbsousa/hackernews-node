const { GraphQLServer } = require('graphql-yoga')

// dummy data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(l => l.id === args.id)
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find(link => link.id === args.id);
      for (const arg in args) {
        if (args[arg] && arg !== "id") { link[arg] = args[arg] };
      };
      return link;
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex(l => l.id === args.id);
      const link = links[index];
      links.splice(index, 1);
      return link;
    }
  }
}

// yoga server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
