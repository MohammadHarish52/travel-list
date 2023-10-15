import { useState } from "react";

export default function App() {
  //lifting state
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((item) => item.filter((item) => item.id !== id));
  }
  // adding togling functionality
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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
function PackingList({ items, onDeleteItems, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");

  //sorting

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort packeded status</option>
        </select>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items</em>
      </p>
    );
  // derived state usage
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round(numPacked / numItems) * 100;
  return (
    <div className="stats">
      {percentage === 100 ? (
        " You got everything Packed,You are Ready to go✈️"
      ) : (
        <em>
          👜 You have {numItems} items on your list , and you already packed{" "}
          {numPacked} ({percentage})%{" "}
        </em>
      )}
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.description} {item.qunatity}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>✖️</button>
    </li>
  );
}
