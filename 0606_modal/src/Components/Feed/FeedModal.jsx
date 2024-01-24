import React, { useEffect } from 'react';
import styles from './FeedModal.module.css';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto } from '../../store/photo';
import { closeModal } from '../../store/ui';

const FeedModal = ({ photo }) => {

  const { modal } = useSelector(state => state.ui)

  const { loading, error, data } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal())
  }

  useEffect(() => {
    dispatch(closeModal())
  },[dispatch])

  if (!modal) return null;

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
