import styled from 'styled-components';
import { Row } from 'antd';

import { Colors } from '../../../theme';

export const LoginContainer = styled(Row)`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
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
      text-align: center;
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

export const LoginLeftWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const LogoContainer = styled.div`
  width: 128px;
  flex-shrink: 0;
  margin-top: 40px;
  margin-left: 40px;
  .logo {
    width: 100%;
  }
`;

export const LoginBanner = styled.img`
  height: calc(100vh + 2px);
  margin-top: -1px;
  position: relative;
  left: 1px;
  user-select: none;
`;

export const RememberMe = styled.div`
  color: ${Colors.black4};
  font-size: 15px;
  font-family: Heebo;
`;

export const ForGotPassword = styled.div`
  color: ${Colors.branding};
  font-size: 15px;
  font-family: Heebo;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
