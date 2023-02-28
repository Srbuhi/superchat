import React from 'react';
import './App.css';
import { firestore, auth }   from './config.js';

import { useAuthState }      from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, orderBy, query, limit } from 'firebase/firestore';


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

//Component SignIn 
function SignIn () {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider); 
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}


//Component SignOut
function SignOut () {
  return auth.currentUser && (
    <button onClick={ () => auth.signOut() }>Sign Out</button>
  )
}


//Component ChatRoom
function ChatRoom () {
  const messageRef = collection(firestore , "messages");
  const myquery = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(myquery, {idField: 'id'})

  return (
    <>
      <div>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return (
    <p>{text}</p>
  )
  
}
export default App;
