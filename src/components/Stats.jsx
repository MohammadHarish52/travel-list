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
export default Stats;
