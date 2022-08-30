import React, { Component } from 'react';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';

class ImageGallery extends Component {
  static API_KEY = '28811056-f3e78fd673175542d7021b7d4';

  state = {
    images: [],
    status: 'idle',
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'panding' });
      this.reguestImages();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.reguestImages();
    }
  }

  reguestImages = () => {
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=${ImageGallery.API_KEY}&q=${this.props.searchName}&image_type=photo&orientation=horizontal&page=${this.state.currentPage}&per_page=12`
      )
        .then(res => res.json())
        .then(res => {
          this.setState(prevState => ({
            status: 'resolved',
            images: [...prevState.images, ...res.hits],
          }));
        });
    }, 2000);
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <></>;
    }

    if (status === 'panding') {
      return <p>завантаження ...</p>;
    }

    if (status === 'rejected') {
      return <p>Помилка</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <GalleryList>
            {this.state.images.map(({ id, webformatURL, tags }) => (
              <GalleryItem key={id}>
                <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
              </GalleryItem>
            ))}
          </GalleryList>
          <LoadMore loadMore={this.loadMore}>LoadMore</LoadMore>
        </>
      );
    }
  }
}

export default ImageGallery;
