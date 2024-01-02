# 5 - More Redux

## 5.1 - Where to use

### 5.1.2 - Global vs Local

- Global State goes to Redux

- Local State may or may not go to Redux

- Avoid placing local states that change frequently (Form status, screen size, scroll position, etc).

## 5.2 - Forms

## 5.3 - Cache

## 5.4 - Selector

The selector is a **function that we can use directly in useSelector to return exactly the data from the store that we need**. We use a selector when we need to select **specific data without the need to modify the state data**.

```js
export const getOverFiveKilos = (state) => {
  const {data} = state.photos;
  const overFiveKg = data?.filter(({peso}) => peso >= 5);
  const transformPound = overFiveKg?.map((photo) =>({
    ...photo,
    //converting from kg to pounds
    peso: Math.floor(photo.peso * 2.2)
  }));
  return transformPound
}
```

```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './store/photos';
import {getOverFiveKilos} from './store/photos';

const Photos = () => {

  // general way to use the state
  // const {data} = useSelector((state) => state.photos);

  //new way to use specific data from the state without modifying it
  const data = useSelector(getOverFiveKilos)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])

  if (!data) return null

  return (
    <>
      <p>
        {data.map((photo) => (
            //It'll already change the number value but not the state itself.
            <li key={photo.id}>{photo.title} - {photo.peso}</li>
          ))}
      </p>
    </>
  )
}

export default Photos;
```
