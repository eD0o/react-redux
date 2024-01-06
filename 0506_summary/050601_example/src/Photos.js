import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, selectOverFiveYears } from './store/photos';

const Photos = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.photos)
  const photos = useSelector(selectOverFiveYears)

  useEffect(() => {
    dispatch(fetchPhotos(1))
  }, [dispatch])

  if (loading) return <p>Carregando...</p>

  if (error) {
    return <p>Erro: {error.message}</p>
  }

  if (photos)
    return (
      <>
        <ul>
          {photos.map((photo) => (
            <li key={photo.id}>
              <p>{photo.title}</p>
              <p>{photo.idade}</p>
              <img src={photo.src} alt="" />
            </li>
          ))}
        </ul>
      </>
    )
  else return null
}

export default Photos;