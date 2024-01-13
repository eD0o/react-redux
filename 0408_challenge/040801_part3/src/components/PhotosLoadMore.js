import React from 'react';
import styles from './PhotosLoadMore.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos } from '../store/photos';
import Loading from './helper/Loading'

const PhotosLoadMore = () => {

  const { pages, infinite, loading } = useSelector(state => state.photos)

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadNewPhotos(pages + 1))
  }

  if(!infinite) return null
  if(loading) return <Loading/>

  return (
    <>
      <button onClick={handleClick} className={styles.buttonLoadMore}>+</button>
    </>
  )
}

export default PhotosLoadMore;