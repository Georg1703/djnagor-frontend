import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_ADMIN_API_URL + "api/invitations/")
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.guest_1_name}: {item.guest_2_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
