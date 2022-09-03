import { LoadMoreBtn } from './LoadMore.styled';
import propTypes from 'prop-types';
export default function LoadMore({ children, loadMore }) {
  return (
    <LoadMoreBtn type="button" onClick={loadMore}>
      {children}
    </LoadMoreBtn>
  );
}
LoadMore.propTypes = {
  loadMore: propTypes.func.isRequired,
};
