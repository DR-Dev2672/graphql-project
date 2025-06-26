import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useQuery,gql} from '@apollo/client'


function App() {

  
  

  const geTodo= gql`
  query
   ExampleQuery($id: ID!) {
  
   getTodos(id: $id) {
        title
        user {
          name
          username
          phone
        }
 }
}    `;

const {loading,error,data}=useQuery(getTodo,{
    variables: { id: "1" },
    fetchPolicy: "network-only"
});

  return (
    <>
        <div>
           hii
        </div>
    </>
  )
}

export default App
