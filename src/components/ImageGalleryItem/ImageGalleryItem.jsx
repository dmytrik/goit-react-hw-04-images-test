import { Img } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webformatURL, tags }) {
  return <Img src={webformatURL} alt={tags} />;
}
