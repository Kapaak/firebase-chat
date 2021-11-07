import { useState } from "react";

const CreateAccount = ({createAccount}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault()
        createAccount(username,password)
        setPassword("")
        setUsername("")
    }
  return (
    <div>
      <h1>Create account</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">enter your login email</label>
          <input
            type="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            required
          />
        </div>
        <div>
          <label htmlFor="password">enter your password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            minLength="6"
            required
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;
