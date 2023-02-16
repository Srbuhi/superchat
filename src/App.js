
import './App.css';
import { firestore, auth }   from './config.js';

import { useAuthState }      from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        
      </header>
      <section>
        <SignIn />
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

export default App;
