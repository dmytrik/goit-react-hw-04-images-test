import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  static API_KEY = '28811056-f3e78fd673175542d7021b7d4';
  static PER_PAGE = 12;

  state = {
    images: [],
    status: 'idle',
    currentPage: 1,
    isLoader: false,
    isLoadMore: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'panding', currentPage: 1, images: [] });
      this.reguestImages();
      return;
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.reguestImages();
      return;
    }
  }

  async reguestImages() {
    setTimeout(async () => {
      const fetch = await axios
        .get(
          `https://pixabay.com/api/?key=${ImageGallery.API_KEY}&q=${this.props.searchName}&image_type=photo&orientation=horizontal&page=${this.state.currentPage}&per_page=${ImageGallery.PER_PAGE}`
        )
        .catch(() => {
          this.setState({ isLoader: false, isLoadMore: false });
          console.clear();
          // this.setState({
          //   error: 'Зображень більше немає(',
          //   status: 'rejected',
          // });
          // setTimeout(() => {
          //   this.setState({ status: 'idle' });
          // });
        });
      const images = await fetch.data.hits;
      const countImg = await fetch.data.totalHits;

      if (images.length === 0 && this.state.currentPage === 1) {
        this.setState({
          status: 'rejected',
          error: `За запитом ${this.props.searchName} нічого не знайдено(`,
        });
        setTimeout(() => {
          this.setState({ status: 'idle' });
        });
        return;
      }
      if (0 < countImg && countImg <= ImageGallery.PER_PAGE) {
        this.setState(prevState => ({
          status: 'resolved',
          isLoader: false,
          isLoadMore: false,
          images: [...prevState.images, ...images],
          error: null,
        }));
        // this.setState({
        //   error: 'Зображень більше немає(',
        //   status: 'rejected',
        // });
        // setTimeout(() => {
        //   this.setState({ status: 'idle' });
        // });
        return;
      }
      if (countImg === this.state.images.length + images.length) {
        this.setState(prevState => ({
          status: 'resolved',
          isLoader: false,
          isLoadMore: false,
          images: [...prevState.images, ...images],
          error: null,
        }));
        return;
      }
      this.setState(prevState => ({
        status: 'resolved',
        isLoader: false,
        isLoadMore: true,
        images: [...prevState.images, ...images],
        error: null,
      }));
      //   return Promise.reject(
      //     new Error(`За запитом ${this.props.searchName} нічого не знайдено(`)
      //   );
      // })
      // .catch(error => {
      //   this.setState({ status: 'rejected', error });
      // });
    }, 1000);
  }

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
      toast.error(this.state.error);
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
          {this.state.isLoader && <Loader />}
          {this.state.isLoadMore && (
            <LoadMore loadMore={this.loadMore}>LoadMore</LoadMore>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
