import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './store/photos';
import {getOverFiveKilos} from './store/photos';

const Photos = () => {

  // const {data} = useSelector((state) => state.photos);
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
            <li key={photo.id}>{photo.title} - {photo.peso}</li>
          ))}
      </p>
    </>
  )
}

export default Photos;