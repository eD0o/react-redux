import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PhotosContent.module.scss';

const PhotosContent = () => {

  const { list } = useSelector((state) => state.photos);

  return (
    <>
      <ul className={styles.listImages}>
        {list.map((photo) =>
          <li key={photo.id} className={`${styles.listImagesItem} anime`}>
            <img src={photo.src} alt={photo.title} className={styles.listImagesImg}/>
            <h2 className={styles.listImagesTitle}>{photo.title}</h2>
            <span className={styles.listImagesAccess}>{photo.acessos}</span>
          </li>
        )}
      </ul>
    </>
  )
}

export default PhotosContent;