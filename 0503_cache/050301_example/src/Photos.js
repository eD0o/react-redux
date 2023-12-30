import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './store/photos';

const Photos = () => {

  const { data } = useSelector((state) => state.photos);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])

  if (!data) return null

  return (
    <>
      <p>{data.map(photo => <li key={photo.id}>{photo.title}</li>)}</p>
    </>
  )
}

export default Photos;