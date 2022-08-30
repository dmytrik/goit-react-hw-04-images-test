import { LoadMoreBtn } from './LoadMore.styled';

export default function LoadMore({ children, loadMore }) {
  return (
    <LoadMoreBtn type="button" onClick={loadMore}>
      {children}
    </LoadMoreBtn>
  );
}
