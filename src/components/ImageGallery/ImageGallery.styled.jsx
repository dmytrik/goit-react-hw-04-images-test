import styled from '@emotion/styled';

export const GalleryList = styled.ul`
  padding: 50px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
  margin-top: -20px;
`;

export const GalleryItem = styled.li`
  margin-left: 20px;
  margin-top: 20px;
  min-height: 20px;
  flex-basis: calc((100% - 80px) / 4);
`;
