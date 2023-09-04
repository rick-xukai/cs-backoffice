import styled from 'styled-components';
import { BreakPoints, Colors } from '../../theme';

export const EventDsahboardContainer = styled.div``;

export const BannerWrapper = styled.div`
  width: 100%;
  background: ${Colors.branding};
  padding-top: 60px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  height: 172px;
  overflow: hidden;

  .banner-image-wrapper {
    width: 471px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media (max-width: ${BreakPoints.lg}px) {
    height: auto;
    padding-top: 113px;
    display: block;
    .banner-image-wrapper {
      width: 100%;
      aspect-ratio: 2 / 1;
    }
  }
  .content {
    padding: 24px;
    width: calc(100% - 471px);
    @media (max-width: ${BreakPoints.lg}px) {
      width: 100%;
    }
  }
  .title {
    font-family: Oswald;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    text-transform: uppercase;
    color: ${Colors.white};
    margin: 8px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .time {
    color: ${Colors.white};
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    .clock {
      width: 18px;
      height: 18px;
      position: relative;
      top: -1px;
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 0 24px 24px 24px;
  margin-top: -24px;
  position: relative;
  z-index: 2;
  overflow-x: hidden;
  @media (max-width: ${BreakPoints.lg}px) {
    padding: 0 15px 15px 15px;
  }
`;

export const CardWrapper = styled.div<{ hoverable: boolean }>`
  padding: 16px 20px 20px 20px;
  background: ${Colors.white};
  border-radius: 2px;
  transition: 0.3s;
  ${(props) =>
    props.hoverable &&
    `cursor: pointer;
     canvas {
      cursor: pointer !important;
    }
    :hover {
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08)
    }
  `};
  .text-container {
    text-align: center;
    margin-top: 30px;
  }
  .large-text {
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
  }
  .small-text {
    color: ${Colors.black4};
    font-size: 17px;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const InfoWrapper = styled.div<{
  justify?: 'center' | 'left' | 'right';
}>`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: ${(props) => props.justify || 'left'};
  .info {
    color: ${Colors.grey6};
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
  }
`;

export const BottomBar = styled.div`
  padding: 8px 12px;
  background: ${Colors.grey9};
  justify-content: space-between;
  display: flex;
  .left {
    color: ${Colors.grey6};
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
  .right {
    color: ${Colors.black4};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  }
`;

export const DashboardListCardWrapper = styled.div`
  padding: 20px;
  background: ${Colors.white};
  border-radius: 2px;
  .title {
    color: ${Colors.black5};
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
  .list {
    height: 145px;
    overflow-y: auto;
    overflow-x: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const NormalListItemWrapper = styled.li`
  padding: 6px 0;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 2px;
  }
  border-bottom: 1px solid ${Colors.grey8};
  :last-child {
    border-bottom: none;
  }
  .title {
    color: ${Colors.black4};
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 0;
    line-height: 21px;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .sub-title {
    font-size: 13px;
    margin: 0;
    font-weight: 400;
    color: ${Colors.grey6};
    font-weight: 400;
    b {
      color: ${Colors.black4};
      font-size: 15px;
      font-weight: 500;
    }
  }
  .numbers {
    line-height: 26px;
    margin: 0;
    font-weight: 400;
    color: ${Colors.grey6};
    font-weight: 400;
    text-align: right;

    b {
      color: ${Colors.black4};
      font-size: 15px;
      font-weight: 500;
    }
  }
`;
export const RankingListItemWrapper = styled.li`
  .rank-number {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    text-align: center;
    line-height: 20px;
    color: ${Colors.black4};
    background: ${Colors.grey9};
    font-size: 12px;
    font-weight: 700;
    position: relative;
    top: 3px;
  }
  .title {
    color: ${Colors.black4};
    font-size: 15px;
    font-weight: 500;
    line-height: 26px;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .numbers {
    line-height: 26px;
    margin: 0;
    font-weight: 400;
    color: ${Colors.grey6};
    font-weight: 400;
    text-align: right;
    display: flex;
    flex-wrap: nowrap;
    justify-content: right;
    gap: 3px;
    b {
      color: ${Colors.black4};
      font-size: 15px;
      font-weight: 500;
    }
  }
  border-bottom: 1px solid ${Colors.grey8};
  padding: 5px 0 9px 0;
  :last-child {
    border-bottom: none;
  }
`;

export const ExtraText = styled.span`
  color: ${Colors.branding};
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  transition: 0.3s;
  .anticon {
    font-size: 12px;
    margin-left: 5px;
    position: relative;
    top: -1px;
  }
  :hover {
    color: ${Colors.primaryHoverRed};
  }
`;
