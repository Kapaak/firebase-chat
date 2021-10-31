import { ref, set, update, get, query, onValue } from "firebase/database";
import { useEffect, useState } from "react";

import { db } from "../firebase";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data,setData] = useState([])

  const dbRef = ref(db, "/users");

  const convertToArray = (snapshot) =>{
    //not working
    const item = snapshot.val();
    item.key = snapshot.key;
    return item
  }
  
  const readData = async () => {
    // const dataSnapshot = await get(query(dbRef)); // takhle jednoduse muzu dostat ty data, moznA BY SE DALO TO SPODNI TIMHLE ZJEDNODUSIT

    onValue(query(dbRef), (snapshot) => {
      const array = []
      snapshot.forEach(s=>{
        //converting object to array
        // const item = s.val();
        // item.key = s.key;
        const item = convertToArray(s)
        array.push(item)
      })
      setData(array);
      console.log("new data added");
    });

  };

  //https://stackoverflow.com/questions/67571500/how-to-read-write-and-query-data-in-firebase-realtime-database-using-firebase-s
  const writeData = async (e) => {
    e.preventDefault();
    const newUserName = name;
    const newAge = age;
    const userRef = ref(db, `users/${newUserName}`);

    await set(userRef, { name: newUserName, age: newAge });
    setAge("")
    setName("")
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <div>
      <h1>firebase</h1>
      <form action="" onSubmit={e =>writeData(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="age">age</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        <button>submit to db</button>
      </form>
      <button onClick={() => readData()}>read from db</button>
      <h2>Data</h2>
      {data?.map((d,i)=><div key={i}>{d.name}</div>)}
    </div>
  );
};

export default App;