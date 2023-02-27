
import './App.css';
import { firestore, auth }   from './config.js';

import { useAuthState }      from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
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
  const query = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(query, {idField: 'id'})

  return (
    <>
      <div>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

export default App;
