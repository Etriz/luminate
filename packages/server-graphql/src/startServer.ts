import {ApolloServer, CorsOptions} from 'apollo-server-express'
import express from 'express'
const app = express()

import {typeDefs, resolvers} from './schema'
import createDbConnection from './db/createDbConnection'
import models from './db/models'

const PORT = process.env.PORT || 3000

const startServer = async () => {
  await createDbConnection()
  // configure cors
  const whitelist = [`http://localhost:${PORT}`, 'http://localhost:8000']

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      // allow cors from deployment branches in netlify
      const originSplitForStaging = origin.split('--')
      const parsedOrigin = originSplitForStaging.length > 1 ? `https://${originSplitForStaging[1]}` : origin
      if (whitelist.includes(parsedOrigin)) return callback(null, true)

      callback(new Error('Request rejected by CORS'))
    },
    credentials: true,
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => {
      return {
        req,
        res,
        models,
      }
    },
    playground:
      process.env.NODE_ENV === 'production'
        ? false
        : {
            settings: {
              'request.credentials': 'include',
            },
          },
  })

  server.applyMiddleware({app, cors: corsOptions})

  app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
}

startServer()
