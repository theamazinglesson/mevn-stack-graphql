require('dotenv').config({ path: "./config/.env" });
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const graphql= require('graphql');
const cors = require('cors');
const GraphQLSchema = graphql.GraphQLSchema;

const RootQuery = require('./graphql/schema/index');
const RootMutation = require('./graphql/resolvers/index');


const app = express();

mongoose.connect(process.env.MONGO_URI, 
{ useUnifiedTopology: true, useNewUrlParser: true }, 
() => console.log('Mongodb is connected'));

app.use(cors());





app.use('/graphql', graphqlHTTP({
    schema: new GraphQLSchema({query: RootQuery, mutation: RootMutation}),
    graphiql: true
}));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));
