import { useState } from "react";

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

    setItems((prevItems) => [...prevItems, newItem]);
    setDescription("");
    setQuantity(1);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  }

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));

  // حساب الإحصائيات (Stats)
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100) || 0;

  return (
    <div className="app">
      <h1> FAR AWAY </h1>

      <form className="add-form" onSubmit={handleAddItem}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>{num}</option>
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
                value={item.packed}
                onChange={() => handleToggleItem(item.id)}
              />
              <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
              </span>
              {/* زرار المسح */}
              <button onClick={() => handleDeleteItem(item.id)}>❌</button>
            </li>
          ))}
        </ul>

        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">SORT BY INPUT ORDER</option>
            <option value="description">SORT BY DESCRIPTION</option>
            <option value="packed">SORT BY PACKED STATUS</option>
          </select>
          <button onClick={handleClearList}>CLEAR LIST</button>
        </div>
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