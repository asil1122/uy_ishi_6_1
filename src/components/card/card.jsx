import React from "react";

export const Card = ({ item, deleteItem, editItem }) => {
  return (
    <div >
      <h1>{item.name}</h1>
      <p >{item.email}</p>
      <button
        onClick={() => deleteItem(item.id)}
      >
        delete
      </button>

      <button
        onClick={() => editItem(item.id)}
      >
        edit
      </button>
    </div>
  );
};

