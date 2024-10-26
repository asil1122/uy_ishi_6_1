import React from "react";
import { Card } from "./components/card/card";
import axios from "axios";
import Form from "./components/form/form";
import request from "./request";

function App() {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState(null);

  React.useEffect(() => {
    request
      .get("/todos")
      .then((res) => {
        setData(res.data);
      })
  }, []);

  const deleteItem = (id) => {
    request.delete(`todos/${id}`).then((res) => {
      setData(data.filter((item) => item.id !== id));
    });
  };

  const AddUser = (newUser) => {
    setData((prevData) => [...prevData, newUser]);
  };

  const editItem = (id) => {
    const user = data.find((item) => item.id === id);
    setData2(user);
  };

  const updateUser = (updatedUser) => {
    request
      .put(`todos/${updatedUser.id}`, updatedUser)
      .then((res) => {
        setData(
          data.map((item) => (item.id === updatedUser.id ? res.data : item))
        );
        setData2(null);
      })

  };

  return (
    <div>
      <Form
        AddUser={AddUser}
        setData2={data2}
        updateUser={updateUser}
      />
      <div>
        {data?.map((item) => (
          <div key={item.id}>
            <Card editItem={editItem} deleteItem={deleteItem} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
