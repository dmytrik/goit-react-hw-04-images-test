import preloader from '../../images/preloader.gif';
import { Preloader } from './Loader.styled';

export default function Loader() {
  return (
    <Preloader src={preloader} alt="завантаження" width="40" height="40" />
  );
}
