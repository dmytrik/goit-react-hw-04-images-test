import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  static API_KEY = '28811056-f3e78fd673175542d7021b7d4';

  state = {
    images: [],
    status: 'idle',
    currentPage: 1,
    isLoader: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'panding', currentPage: 1, images: [] });
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
          if (res.hits.length !== 0) {
            this.setState(prevState => ({
              status: 'resolved',
              isLoader: false,
              images: [...prevState.images, ...res.hits],
              error: null,
            }));
            return;
          }
          return Promise.reject(
            new Error(`За запитом ${this.props.searchName} нічого не знайдено(`)
          );
        })
        .catch(error => {
          this.setState({ status: 'rejected', error });
        });
    }, 2000);
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      isLoader: true,
    }));
  };

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <></>;
    }

    if (status === 'panding') {
      return <Loader />;
    }

    if (status === 'rejected') {
      toast.error(this.state.error.message);
      return;
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
          {this.state.isLoader ? (
            <Loader />
          ) : (
            <LoadMore loadMore={this.loadMore}>LoadMore</LoadMore>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
