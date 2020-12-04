import React from 'react';
import './quantityBox.styles.scss';
const QuantityBox = ({ qty, count, setCount }) => {
  const handleIncrease = () => {
    if (qty && qty > count) {
      const val = count + 1;
      setCount(val);
    } else {
      setCount(qty);
    }
  };
  const handleDecrease = () => {
    if (count > 0) {
      const val = count - 1;
      setCount(val);
    }
  };
  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    validateQty(qty);
    setCount(val);
  };

  const validateQty = (val) => {
    if (qty && val > qty) {
      setCount(qty);
    }
  };
  return (
    <div className="quntity-container">
      <button onClick={handleDecrease}>-</button>
      <input
        value={count}
        onChange={handleChange}
        type="number"
        name="quantity"
        id="quantity"
        min={1}
        max={qty || 0}
      />
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantityBox;
