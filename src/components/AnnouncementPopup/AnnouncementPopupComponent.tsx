import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Images, Colors } from '../../theme';

const PopupContainer = styled.div`
  .ant-modal-body {
    padding: 20px 20px 0px 20px !important;
    .title-icon {
      text-align: center;
    }
    .title {
      margin-top: 12px;
      margin-bottom: 24px;
      color: ${Colors.branding};
      text-align: center;
      font-family: Oswald;
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      text-transform: uppercase;
    }
    .info {
      color: ${Colors.black};
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      margin-bottom: 24px;
    }
  }
  .ant-modal-footer {
    .ant-btn[disabled] {
      background: ${Colors.buttonDisable};
      color: ${Colors.white};
      border: none;
    }
    .ant-btn {
      height: 32px;
      padding-top: 0;
      padding-bottom: 0;
      font-size: 15px;
      font-weight: 500;
      .anticon {
        color: ${Colors.white};
      }
    }
  }
`;

const AnnouncementPopupComponent = ({
  modalOpen,
  buttonLoading,
  buttonFunction,
}: {
  modalOpen: boolean;
  buttonLoading: boolean;
  buttonFunction: () => void;
}) => (
  <PopupContainer>
    <Modal
      open={modalOpen}
      title=""
      closable={false}
      centered
      footer={[
        <Button
          disabled={buttonLoading}
          onClick={buttonFunction}
          type="primary"
        >
          {buttonLoading && <LoadingOutlined />}
          Acknowledge
        </Button>,
      ]}
      getContainer={false}
      destroyOnClose
    >
      <Row>
        <Col span={24} className="title-icon">
          <img src={Images.PopupSettingIcon} alt="" />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="title">
          Important announcement
        </Col>
      </Row>
      <Row>
        <Col span={24} className="info">
          Dear Organiser,
        </Col>
      </Row>
      <Row>
        <Col span={24} className="info">
          Please note that this dashboard will reflect the updated standardised
          platform fees of <b>5% + $0.50/ticket</b> starting from{' '}
          <b>1 January 2024.</b>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="info">
          If your agreed upon fees defer from 5% + $0.50/ticket, rest assured
          your payout will not be affected despite what is reflected on the
          dashboard. We hope to continue working closely with every one of our
          customers, so as to constantly improve on your experience.
        </Col>
      </Row>
      <Row>
        <Col span={24} className="info">
          Sincerely, <br />
          CrowdServe Team
        </Col>
      </Row>
    </Modal>
  </PopupContainer>
);

export default AnnouncementPopupComponent;
