import { Col } from 'antd';
import styled from 'styled-components';
import { BreakPoints, Colors } from '../../theme';

export const Container = styled(Col)`
  padding: 16px 40px;
  .content-text {
    margin-bottom: 15px;
  }
  @media (max-width: ${BreakPoints.lg}px) {
    position: fixed;
    bottom: 55px;
    left: 0;
    padding: 16px 15px;
    .tips-content-image {
      display: none;
    }
  }
  .tips-content {
    padding: 24px;
    background: ${Colors.white2};
    @media (max-width: ${BreakPoints.lg}px) {
      padding: 20px;
    }
    .tips-content-title {
      font-size: 18px;
      font-weight: 700;
      color: ${Colors.black};
      margin-bottom: 16px;
    }
    .tips-content-value {
      font-size: 13px;
      font-weight: 400;
      color: ${Colors.grey6};
    }
    .tips-content-image {
      margin-top: 10px;
      img {
        max-width: 150px;
      }
    }
  }
`;

export const CloseIcon = styled.img`
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  :hover {
    opacity: 0.7;
  }
`;

export const MiniSize = styled(Col)`
  margin-bottom: 16px;
  @media (max-width: ${BreakPoints.lg}px) {
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 0%);
  }
`;

export const MiniContainer = styled.div`
  cursor: pointer;
  transition: 0.2s;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${Colors.white2};
  text-align: center;
  margin: auto;
  margin-top: 24px;
  border: 1px solid ${Colors.white2};
  :hover {
    border: 1px solid ${Colors.black};
  }
  img {
    width: 40px;
    margin-top: 10px;
  }
  p {
    margin-bottom: 0;
    color: ${Colors.black4};
    font-size: 13px;
    font-weight: 400;
  }
`;
