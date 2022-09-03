import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ImgBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escClose);
  }

  escClose = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleCloseModal}>
        <ImgBox>{this.props.children}</ImgBox>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModal: propTypes.func.isRequired,
};
