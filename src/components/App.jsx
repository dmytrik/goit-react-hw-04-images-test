import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchName: '',
  };

  changeName = name => {
    this.setState({ searchName: name });
  };

  render() {
    return (
      <>
        <Searchbar submitName={this.changeName} />
        <ImageGallery searchName={this.state.searchName} />
        <ToastContainer />
      </>
    );
  }
}
export default App;
