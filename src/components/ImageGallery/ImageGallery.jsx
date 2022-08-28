import React, { Component } from 'react';

class ImageGallery extends Component {
  static API_KEY = '28811056-f3e78fd673175542d7021b7d4';

  state = {
    images: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'panding' });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?key=${ImageGallery.API_KEY}&q=${this.props.searchName}&image_type=photo&orientation=horizontal&page=1&per_page=12`
        )
          .then(res => res.json())
          .then(res => {
            this.setState({ status: 'resolved' });
            this.setState({ images: res.hits });
          });
      }, 2000);
    }
  }

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <></>;
    }

    if (status === 'panding') {
      return <p>завантаження ...</p>;
    }

    if (status === 'rejected') {
      return <p>помилка</p>;
    }

    if (status === 'resolved') {
      return <p>все ок</p>;
    }
  }
}

export default ImageGallery;
