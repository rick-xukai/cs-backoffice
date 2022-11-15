import { Row, Card } from 'antd';
import styled from 'styled-components';
import Colors from '../../../theme/Colors';

export const LoginContainer = styled(Row)`
  width: 1000px;
  margin: auto;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.48px);
  border-radius: 20px;
  padding: 125px 320px;
`;

export const LoginCard = styled(Card)`
  border: none;
  background: unset;
  .ant-card-body {
    padding: 0;
    text-align: center;
    .logo {
      width: 224px;
      height: 116px;
      margin-bottom: 45px;
    }
    .ant-form-item {
      margin-bottom: 25px;
    }
    .ant-input-prefix {
      color: ${Colors.branding};
    }
    .ant-form-item-control-input-content,
    .ant-input-affix-wrapper,
    .ant-form-item-control-input {
      height: 40px;
      min-height: 40px;
    }
    .ant-form-item-control-input {
      border-radius: 6px;
    }
    .ant-input-affix-wrapper {
      border: none;
      font-size: 16px;
    }
    .ant-input-affix-wrapper:focus {
      box-shadow: none;
    }
    .action-wrapper {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .ant-checkbox-wrapper {
        color: ${Colors.white};
      }
      p {
        cursor: pointer;
        color: ${Colors.branding};
        margin-bottom: 0;
      }
    }
    .ant-btn {
      height: 40px;
      padding: 0;
      box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
      border-radius: 6px;
      font-size: 16px;
    }
    .ant-form-item-explain-error {
      margin-top: 2px;
    }
  }
  .ant-card-head {
    padding: 0;
    border: none;
    font-weight: 400;
    .ant-card-head-title {
      padding: 0;
    }
  }
  .bg-primary {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .cart-title {
    padding: 24px;
    color: var(--primary-color);
    h5 {
      color: var(--primary-color);
    }
    p {
      font-size: 14px;
    }
  }
  .ant-avatar {
    margin-top: -45px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
`;
