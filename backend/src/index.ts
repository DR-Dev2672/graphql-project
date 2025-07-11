import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';


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
completed:Boolean!,
user:User
},


type Book{
title:String,
author:String
},


type Query{
getTodos:[Todos]
books:[Book]
getAllUsers:[User]
getUser(id:ID!):User

}

`
const resolvers={

    
         Todos:{
        user:async(todos)=>(
            await axios.get(`https://jsonplaceholder.typicode.com/users/${todos.id}`)
        ).data

    },

   
    Query:{
        books:()=>books,
        getAllUsers:async()=>
        (await  axios.get('https://jsonplaceholder.typicode.com/users')).data,
        
        getTodos:async()=>
            (await  axios.get('https://jsonplaceholder.typicode.com/todos')).data,
        getUser:async(parent,{id})=>
            (await  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
        
    }
}

const server=new ApolloServer({
    typeDefs,
    resolvers,
})

const {url}=await startStandaloneServer(server, {
    listen: { port: 4000 },
})


console.log(` Server ready at: ${url}`);

