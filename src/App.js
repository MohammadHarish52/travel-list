import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((item) => item.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //lifting state
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 🎋</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  // controlled elements basically consist of three steps
  //   - create a state variable to hold the value entered by user.
  //    - passing the value on the element
  //    - add an event handler that updates this state when something happens in UI like clicking on button or typing text etc...

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newitem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newitem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <div className="stats">
      👜 You have X items on your list , and you already packed x(x%)
    </div>
  );
}
function Item({ item, onDeleteItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {}} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.description} {item.qunatity}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>✖️</button>
    </li>
  );
}
