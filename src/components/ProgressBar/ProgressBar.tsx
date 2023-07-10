import React from 'react';
import { Row, Col, Steps } from 'antd';
import type { StepsProps } from 'antd';
import styled from 'styled-components';

import { Colors } from '../../theme';

const ProgressBarContainer = styled.div`
  max-width: 584px;
  padding: 16px 0;
  margin: auto;
  .step-name {
    text-align: center;
    font-size: 18px;
    font-family: Oswald;
    font-weight: 700;
    line-height: 28px;
    text-transform: uppercase;
    color: ${Colors.black4};
    margin-top: 8px;
  }
  .ant-steps-item-icon {
    line-height: unset;
    margin-left: 48px !important;
  }
  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background: ${Colors.grey8};
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background: ${Colors.grey8};
  }
  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background: ${Colors.grey8};
  }
  .ant-steps-item-tail {
    top: 14px;
  }
  .ant-steps-item-tail::after {
    height: 2px;
    background: ${Colors.grey8};
  }
  .ant-steps-icon {
    .ant-badge-status-dot {
      width: 14px;
      height: 14px;
    }
  }
  .ant-steps-item-title {
    font-size: 18px;
    font-family: Oswald;
    font-weight: 700;
    line-height: 28px;
    color: ${Colors.black4};
    text-transform: uppercase;
  }
  .bar-status {
    display: flex;
    align-items: center;
    .ant-badge-status-dot {
      width: 14px;
      height: 14px;
    }
    > :last-child {
      margin: 0 8px;
    }
  }
  @media (max-width: 992px) {
    .mobile-steps {
      padding: 0 15px;
      .ant-steps-item-tail {
        margin-left: 18px;
      }
      .ant-steps-item-icon {
        margin-left: 8px !important;
      }
      .ant-steps-item-content {
        display: none;
      }
    }
  }
  @media (max-width: 576px) {
    .mobile-steps {
      .ant-steps-item-tail {
        padding: 3.5px 18px;
      }
    }
  }
`;

const ProgressBar = ({
  items,
  mobileItems,
  currentStep,
  setSteps,
}: {
  items: StepsProps['items'];
  mobileItems: StepsProps['items'];
  currentStep: number;
  setSteps: (step: number) => void;
}) => (
  <ProgressBarContainer>
    <Row>
      <Col lg={24} span={0}>
        <Steps
          current={currentStep}
          labelPlacement="vertical"
          items={items}
          onChange={(e) => setSteps(e)}
        />
      </Col>
      <Col lg={0} span={24}>
        <div className="mobile-steps">
          <Steps
            current={currentStep}
            labelPlacement="vertical"
            items={mobileItems}
            onChange={(e) => setSteps(e)}
            responsive={false}
          />
        </div>
        <div className="step-name">Create Event</div>
      </Col>
    </Row>
  </ProgressBarContainer>
);

export default ProgressBar;
