import { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState("input");

 
  function handleAddItem(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { 
      id: Date.now(), 
      description, 
      quantity, 
      packed: false 
    };

    setItems((prev) => [...prev, newItem]);
    setDescription("");
    setQuantity(1);
  }

 
  function handleDeleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }


  function handleToggleItem(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }


  function handleClearList() {
    if (items.length === 0) return;
    const confirmed = window.confirm("Are you sure you want to delete everything? ");
    if (confirmed) setItems([]);
  }


  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
  else
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));


  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100) || 0;

  return (
    <div className="app">
      <h1> FAR AWAY 🧳</h1>

      <form className="add-form" onSubmit={handleAddItem}>
        <h3>What do you need for your 😍 trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option value={n} key={n}>{n}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>ADD</button>
      </form>

      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => handleToggleItem(item.id)}
              />
              <span style={item.packed ? { textDecoration: "line-through", opacity: 0.6 } : {}}>
                {item.quantity} {item.description}
              </span>
              <button onClick={() => handleDeleteItem(item.id)}>❌</button>
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <div className="actions">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="input">SORT BY INPUT ORDER</option>
              <option value="description">SORT BY DESCRIPTION</option>
              <option value="packed">SORT BY PACKED STATUS</option>
            </select>
            <button onClick={handleClearList}>CLEAR LIST</button>
          </div>
        )}
      </div>

      <footer className="stats">
        <em>
          {percentage === 100
            ? "You got everything! Ready to go ✈️"
            : ` You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
        </em>
      </footer>
    </div>
  );
}