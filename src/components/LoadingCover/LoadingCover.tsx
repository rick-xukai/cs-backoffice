import styled from 'styled-components';

const LoadingCover = styled.div<{ show: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 13;
  left: 0;
  top: 0;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

export default LoadingCover;
