import { useState } from "react";

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
export default Form;
