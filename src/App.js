import React, { useState } from 'react';
import './App.css';
import { firestore, auth }   from './config.js';

import { useAuthState }      from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, orderBy, query, limit, documentId, addDoc, serverTimestamp } from 'firebase/firestore';
import { async } from '@firebase/util';


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className='header'>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section className='section'>
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
    <button className='sign-in'onClick={signInWithGoogle}>Sign in with Google</button>
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

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {

    e.preventDefault();
    const{uid, photoURL} = auth.currentUser;
  console.log(auth.currentUser);
    await addDoc(messageRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })
      setFormValue('');

  }

  return (
    <>
      <div>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage}>
        <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit'>🕊️</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoUrl } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={ `message ${messageClass}` }>
      <img src={photoUrl} alt="photo" />
      <p>{text}</p>
    </div>
  )
  
}
export default App;
