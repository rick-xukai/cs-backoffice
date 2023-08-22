import styled from 'styled-components';
import { BreakPoints, Colors } from '../../theme';

export const PageContainer = styled.div`
  padding: calc(113px + 15px) 15px 15px;
  padding-bottom: 100px;
  background: ${Colors.grey5};
  @media (min-width: ${BreakPoints.lg}px) {
    padding: calc(60px + 24px) 24px 24px;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${Colors.black5};
  p {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    margin: 0;
  }
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .title {
    color: ${Colors.black4};
    font-size: 15px;
    font-weight: 500;
  }
  .right-info {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    p {
      margin: 0;
      font-size: 15px;
    }
    .count {
      color: ${Colors.black4};
      font-weight: 500;
    }
    .percent {
      color: ${Colors.grey6};
      font-weight: 400;
    }
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: 5px;
  .content {
    height: 100%;
    background: ${Colors.branding};
    position: relative;
    z-index: 2;
  }
  .line {
    height: 1px;
    width: 100%;
    background: ${Colors.grey8};
    position: relative;
    top: -3px;
  }
`;

export const ProgressContent = styled.div`
  height: 148px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
