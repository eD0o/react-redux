import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const selectUniqueColors = ({products}) => Array.from(new Set(products.data.map(({color}) => color)));

const Filter = () => {

  // const colors = ['Blue', 'Pink', 'Black'];

  const colors = useSelector(selectUniqueColors)

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelectedColors([...selectedColors, target.value])
    } else {
      setSelectedColors(selectedColors.filter(color => color !== target.value))
    }
  }

  const handleChecked = (color) => {
    return selectedColors.includes(color)
  }

  return (
    <>
      <p>{selectedColors}</p>
      <input type="number" value={minPrice} onChange={({ target }) => setMinPrice(target.value)} placeholder='min' />
      <input type="number" value={maxPrice} onChange={({ target }) => setMaxPrice(target.value)} placeholder='max' />

      {colors.map(color =>
        <label key={color}>
          <input type="checkbox" value={color} onChange={handleChange} checked={handleChecked(color)} />
          {color}
        </label>
      )}
    </>
  )
}

export default Filter;