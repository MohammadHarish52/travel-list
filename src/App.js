import { useState } from "react";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Form from "./components/Form";
import Stats from "./components/Stats";

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

  function handleClear() {
    // adding the confirm functionality from the user itself thro window object
    const confirmed = window.confirm("You sure Want to delete everything");
    if (confirmed) setItems([]);
    else {
      return null;
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearItem={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
