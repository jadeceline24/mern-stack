import './App.css';
import React, {useEffect, useState} from 'react';

import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [list, setList] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3001/addfriend', {name: name, age: age})
    .then((response) => {
        setList([...list, {_id: response.data._id, name: name, age: age}]); //add without refreshing
      },
    );
  };

  const update = (id) => {
    const newAge = prompt('Add new age');
    Axios.put('http://localhost:3001/update', {newAge: newAge, id: id}).then(
      () => {
        setList(
          list.map((val) => {
            return val._id === id
              ? {_id: id, name: val.name, age: newAge}
              : val;
          }),
        );
      },
    );
  };

  const remove = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setList(
        list.filter((val) => {
          return val._id !== id;
        }),
      );
    });
  };
  useEffect(() => {
    Axios.get('http://localhost:3001/read')
      .then((response) => {
        setList(response.data);
      })
      .catch(() => {
        console.log('Err');
      });
  }, []);
  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Friend age..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="listfriends">
        {list.map((val) => {
          return (
            <div className="container">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
              </div>
              <div className="btn">
                <button
                  onClick={() => {
                    update(val._id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    remove(val._id);
                  }}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
