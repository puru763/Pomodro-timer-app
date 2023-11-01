import { auth, provider } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Timer from "./components/Timer/Timer";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ChakraProvider>
      <div className="wrapper">
        <div className="box">
          {user ? (
            <>
              <div className="pomodro">
                <button
                  className="btn btn-danger btn-md"
                  id="restart"
                  onClick={handleLogout}
                >
                  Signout
                </button>

                <Timer />
              </div>
            </>
          ) : (
            <button
              className="btn btn-danger btn-md"
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </button>
          )}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
