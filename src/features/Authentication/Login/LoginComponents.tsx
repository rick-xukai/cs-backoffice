import { Row } from 'antd';
import styled from 'styled-components';
import { Images, Colors } from '../../../theme';

export const LoginContainer = styled(Row)`
  .login-background {
    background-image: url(${Images.LoginBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    padding-top: 48px;
    padding-left: 48px;
    .logo {
      /* width: 96px; */
      height: 50px;
    }
  }
  .login-form {
    display: block;
    min-width: 350px;
    margin: auto;
    .login-title {
      font-family: Oswald, sans-serif !important;
      font-weight: 700;
      font-size: 28px;
      color: ${Colors.black5};
      margin-bottom: 24px;
    }
    .ant-form-item-control-input-content {
      font-weight: 400;
      font-size: 15px;
    }
    .ant-input {
      border-radius: 2px;
      border-color: ${Colors.grey8};
      font-weight: 400;
      font-size: 15px;
    }
    .ant-input-affix-wrapper {
      padding-top: 0;
      padding-bottom: 0;
      height: 40px;
      border-color: ${Colors.grey8};
      .ant-input {
        padding-left: 5px;
        height: 38px;
      }
    }
    .ant-btn {
      width: 100%;
      border-radius: 2px;
      height: 40px;
      background: ${Colors.branding};
      font-weight: 400;
      font-size: 15px;
      padding-top: 8px;
      padding-bottom: 8px;
    }
    .ant-checkbox-inner {
      border-radius: 2px;
    }
    .ant-input-prefix {
      color: ${Colors.branding};
    }
    .ant-form-item-explain-error {
      margin-bottom: 24px;
      font-weight: 400;
      font-size: 13px;
      color: ${Colors.branding2};
    }
    .remember-me {
      margin-bottom: 16px;
      .ant-form-item-control-input {
        min-height: unset;
      }
    }
    .ant-input-affix-wrapper-focused {
      border-color: ${Colors.black5};
      box-shadow: unset;
    }
  }
`;
