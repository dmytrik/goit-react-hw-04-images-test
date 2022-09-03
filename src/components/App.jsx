import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchName: '',
    showModal: false,
    largeImg: {},
  };

  changeName = name => {
    this.setState({ searchName: name });
  };

  toggleModal = img => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImg: img,
    }));
  };

  render() {
    return (
      <>
        <Searchbar submitName={this.changeName} />
        <ImageGallery
          searchName={this.state.searchName}
          toggleModal={this.toggleModal}
        />
        <ToastContainer />
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <ImageGalleryItem
              webformatURL={this.state.largeImg.src}
              tags={this.state.largeImg.alt}
            />
          </Modal>
        )}
      </>
    );
  }
}
export default App;
