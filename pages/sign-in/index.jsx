import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { useState } from "react";
import CreateAccount from "../../components/CreateAccount";
import SignedUser from "../../components/SignedUser";
import SignInAccount from "../../components/SignInAccount";
import { db } from "../../firebase";

const SignIn = () => {
	const [signedUser, setSignedUser] = useState("");
	const auth = getAuth();

	const createAccount = (username, password) => {
		createUserWithEmailAndPassword(auth, username, password)
			.then(e => console.log(e))
			.catch(error => console.log(error.message));
		console.log("created new account");
	};

	const signInAccount = (username, password) => {
		signInWithEmailAndPassword(auth, username, password)
			.then(e => console.log(e))
			.catch(err => console.log(err.message));
		console.log("signed in");
	};

	onAuthStateChanged(auth, user => {
		if (user) {
			setSignedUser(user.email);
			console.log(user, "useeer signed");
		} else {
			console.log("no users");
			setSignedUser("anonymous");
		}
	});

	return (
		<>
			<CreateAccount createAccount={createAccount} />
			<SignInAccount signInAccount={signInAccount} />
			<SignedUser signedUser={signedUser} />
			<button onClick={() => signOut(auth)}>sign out</button>
		</>
	);
};
export default SignIn;
