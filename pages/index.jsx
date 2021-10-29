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

// import {
//   getDatabase,
//   set,
//   ref,
//   push,
//   onValue,
//   onChildAdded,
//   get,
// } from "firebase/database";
// import { useEffect, useState } from "react";
// import { app } from "../firebase";

// export default function Home() {
//   const [postList, setPostList] = useState([]);

//   const writeData = () => {
//     const db = getDatabase();
//     const postListRef = ref(db, "users");
//     const newPostRef = push(postListRef);
//     set(newPostRef, {
//       username: "daaaym",
//     });
//     setPostList(prev=>[...prev,"daa"])
//   };

//   const readData = () => {
//     let arr = [];
//     let dd = [];
//     const db = getDatabase();
//     const dataRef = ref(db, "users");

//     onValue(dataRef, (snapshot) => {
//       arr.push(snapshot.val());

//       arr.forEach((mobile) => {
//         for (let key in mobile) {
//           console.log(`${key}: ${mobile[key].username}`);
//           console.log(mobile[key].username, "username");
//           dd.push(mobile[key].username);
//           // setPostList(prev=>[...prev,{username:mobile[key].username}])
//         }
//         console.log(dd, "dasdsa");
//         setPostList(dd);
//       });
//     });
//   };

//   const readDataOnChange = () => {
//     const db = getDatabase();
//     const starCountRef = ref(db, "users");
//     onChildAdded(starCountRef, (data) => {
//       setPostList(data.val());
//     });
//   };

//   useEffect(() => {
//     readDataOnChange();
//   }, []);

//   return (
//     <div>
//       <h1>Firebase</h1>
//       <button
//         onClick={() => writeUserData("2", "Pavel", "pz@pz.cz", "urlrulr")}
//       >
//         add to database
//       </button>
//       <button onClick={writeData}>add to db</button>
//       <button onClick={readData}>show data</button>
//       <div>
//         {postList?.length > 1 && postList.map((e, i) => <p key={i}>{e}</p>)}
//       </div>
//     </div>
//   );
// }
