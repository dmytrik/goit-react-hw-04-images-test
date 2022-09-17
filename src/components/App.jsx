import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';

export default function App() {
  // state = {
  //   searchName: '',
  //   showModal: false,
  //   largeImg: {},
  // };

  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState({});

  const changeName = name => {
    setSearchName(name);
  };

  const toggleModal = img => {
    setShowModal(prev => !prev);
    setLargeImg(img);
  };
  return (
    <>
      <Searchbar submitName={changeName} />
      <ImageGallery searchName={searchName} toggleModal={toggleModal} />
      <ToastContainer />
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <ImageGalleryItem webformatURL={largeImg.src} tags={largeImg.alt} />
        </Modal>
      )}
    </>
  );
}
