import { Row, Card } from 'antd';
import styled from 'styled-components';

export const RegisterContainer = styled(Row)`
  margin: 48px auto;
  padding-top: 48px;
  max-width: 720px;
`;

export const RegisterCard = styled(Card)`
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
  .ant-form-item-label > label {
    height: auto;
    font-weight: 500;
    ::before {
      display: none !important;
    }
  }
  .login {
    margin: auto;
  }
`;
