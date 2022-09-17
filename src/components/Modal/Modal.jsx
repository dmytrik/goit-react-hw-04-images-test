import { useEffect } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ImgBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', escClose);
    return () => {
      window.removeEventListener('keydown', escClose);
    };
  });

  const escClose = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Backdrop onClick={handleCloseModal}>
      <ImgBox>{children}</ImgBox>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: propTypes.func.isRequired,
};
