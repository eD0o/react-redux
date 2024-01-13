import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos } from '../store/photos';
import PhotosContent from './PhotosContent';
import PhotosLoadMore from './PhotosLoadMore';

const Photos = () => {

  const { data } = useSelector(state => state.photos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNewPhotos(1));
  }, [dispatch])

  return (
    <>
      <section>
        {data && <PhotosContent />}
        <PhotosLoadMore/>
      </section>
    </>
  )
}

export default Photos;