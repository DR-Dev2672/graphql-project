import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
import {expressMiddleware} from '@apollo/server/express4';

const books=[
    {
        title:"Godan",
        author:"Premchand"
    },
    {
        title:"Karna",
        author:"R.K. Narayan"
    }
]

const typeDefs=`
type User{
id:ID!,
name:String!,
email:String!,
username:String!,
website:String,
phone:String!
},

type Todos{
id:ID!,
title:String!,
completed:Boolean!
},


type Book{
title:String,
author:String
},


type Query{
getAllTodos:[Todos]
books:[Book]
getAllUsers:[User]
}
`
const resolvers={
    Query:{
        books:()=>books,
        getAllUsers:async()=>{
        (await  axios.get('https://jsonplaceholder.typicode.com/users')).data
        },
        getAllTodos:async()=>{
            (await  axios.get('https://jsonplaceholder.typicode.com/todos')).data
        }
    }
}
const app=express();
app.use(cors());    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server=new ApolloServer({
    typeDefs,
    resolvers,
})


await server.start();
app.use('/graphql', expressMiddleware(server));

app.listen(4000, () => {
    console.log('Server is running ');  
});


console.log(` Server ready at:4000 `);

