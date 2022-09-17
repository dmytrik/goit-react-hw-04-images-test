import { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Loader from 'components/Loader/Loader';

export default function ImageGallery({ searchName, toggleModal }) {
  const firstRender = useRef(true);
  // state = {
  //   images: [],
  //   status: 'idle',
  //   currentPage: 1,
  //   isLoader: false,
  //   isLoadMore: false,
  //   error: null,
  // };

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [error, setError] = useState(null);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.searchName !== this.props.searchName) {
  //     this.setState({ status: 'panding', currentPage: 1, images: [] });
  //     this.reguestImages();
  //     return;
  //   }
  //   if (prevState.currentPage !== this.state.currentPage) {
  //     this.reguestImages();
  //     return;
  //   }
  // }
  const reguestImages = () => {
    console.log('я тут');
    const API_KEY = '28811056-f3e78fd673175542d7021b7d4';
    const PER_PAGE = 12;
    setTimeout(async () => {
      const fetch = await axios
        .get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=${PER_PAGE}`
        )
        .catch(() => {
          // this.setState({ isLoader: false, isLoadMore: false });
          setIsLoader(false);
          setIsLoadMore(false);
          console.clear();
          // this.setState({
          //   error: 'Зображень більше немає(',
          //   status: 'rejected',
          // });
          // setTimeout(() => {
          //   this.setState({ status: 'idle' });
          // });
        });
      const currentImages = await fetch.data.hits;
      console.log(currentImages);
      const countImg = await fetch.data.totalHits;

      if (currentImages.length === 0 && currentPage === 1) {
        // this.setState({
        //   status: 'rejected',
        //   error: `За запитом ${this.props.searchName} нічого не знайдено(`,
        // });
        setStatus('rejected');
        setError(`За запитом ${searchName} нічого не знайдено(`);
        setTimeout(() => {
          // this.setState({ status: 'idle' });
          setStatus('idle');
        });
        return;
      }
      if (0 < countImg && countImg <= PER_PAGE) {
        // this.setState(prevState => ({
        //   status: 'resolved',
        //   isLoader: false,
        //   isLoadMore: false,
        //   images: [...prevState.images, ...images],
        //   error: null,
        // }));
        setStatus('resolved');
        setIsLoader(false);
        setIsLoadMore(false);
        setImages(prevImg => [...prevImg, currentImages]);
        setError(null);
        // this.setState({
        //   error: 'Зображень більше немає(',
        //   status: 'rejected',
        // });
        // setTimeout(() => {
        //   this.setState({ status: 'idle' });
        // });
        return;
      }
      if (countImg === currentImages.length + images.length) {
        // this.setState(prevState => ({
        //   status: 'resolved',
        //   isLoader: false,
        //   isLoadMore: false,
        //   images: [...prevState.images, ...images],
        //   error: null,
        // }));
        setStatus('resolved');
        setIsLoader(false);
        setIsLoadMore(false);
        setImages(prevImg => [...prevImg, currentImages]);
        setError(null);
        return;
      }
      // this.setState(prevState => ({
      //   status: 'resolved',
      //   isLoader: false,
      //   isLoadMore: true,
      //   images: [...prevState.images, ...images],
      //   error: null,
      // }));
      setStatus('resolved');
      setIsLoader(false);
      setIsLoadMore(true);
      setImages(prevImg => [...prevImg, currentImages]);
      setError(null);
      //   return Promise.reject(
      //     new Error(`За запитом ${this.props.searchName} нічого не знайдено(`)
      //   );
      // })
      // .catch(error => {
      //   this.setState({ status: 'rejected', error });
      // });
    }, 1000);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      console.log('я тут');
    } else {
      console.log('я тут');
      setStatus('panding');
      setCurrentPage(1);
      setImages([]);

      reguestImages();
    }
  }, [searchName]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      reguestImages();
    }
  }, [currentPage]);

  const loadMore = () => {
    // this.setState(prevState => ({
    //   currentPage: prevState.currentPage + 1,
    //   isLoader: true,
    // }));

    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    setIsLoader(true);
  };

  const openLargeImg = e => {
    if (e.target.nodeName === 'IMG') {
      const largeImg = {
        src: e.target.dataset.large,
        alt: e.target.alt,
      };
      toggleModal(largeImg);
    }
  };
  if (status === 'idle') {
    return <></>;
  }

  if (status === 'panding') {
    return <Loader />;
  }

  if (status === 'rejected') {
    toast.error(error);
    return;
  }

  if (status === 'resolved') {
    return (
      <>
        <GalleryList onClick={openLargeImg}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <GalleryItem key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                tags={tags}
                largeImg={largeImageURL}
              />
            </GalleryItem>
          ))}
        </GalleryList>
        {isLoader && <Loader />}
        {isLoadMore && <LoadMore loadMore={loadMore}>LoadMore</LoadMore>}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchName: propTypes.string.isRequired,
  toggleModal: propTypes.func.isRequired,
};
