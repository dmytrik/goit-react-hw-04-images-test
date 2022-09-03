import { Img } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';
export default function ImageGalleryItem({ webformatURL, tags, largeImg }) {
  return <Img src={webformatURL} alt={tags} data-large={largeImg} />;
}
ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  largeImg: propTypes.string,
};
