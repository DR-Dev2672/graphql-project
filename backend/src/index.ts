import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


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
type Book{
title:String,
author:String
},
type Query{
books:[Book]
}
`
const resolvers={
    Query:{
        books:()=>books,
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

