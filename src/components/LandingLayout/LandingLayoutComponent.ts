import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Colors, BreakPoints } from '../../theme';

export const Container = styled(Row)<{ hidebanner: string }>`
  .landing-form {
    display: block;
    min-width: 350px;
    margin: auto;
    ${(props) =>
      props.hidebanner
        ? `
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `
        : ''}
    .landing-title {
      font-family: Oswald, sans-serif !important;
      font-weight: 700;
      font-size: 28px;
      color: ${Colors.black5};
      margin-bottom: 24px;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
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
  @media (max-width: ${BreakPoints.sm}px) {
    .landing-form {
      padding: 20px;
      .landing-title {
        font-size: 24px;
      }
    }
  }
  @media (max-width: ${BreakPoints.galaxFold}px) {
    .landing-form {
      min-width: 280px;
      padding: 0px;
      .landing-title {
        font-size: 20px;
      }
    }
  }
`;

export const FormContainer = styled(Col)`
  display: flex;
  min-width: 350px;
  @media (max-width: ${BreakPoints.loginLayoutPoint}px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: ${BreakPoints.galaxFold}px) {
    min-width: 280px;
  }
  @media (max-height: ${BreakPoints.logoHidePoint}px) {
    top: 80px;
    transform: translate(-50%, 0%);
  }
`;

export const LogoContainer = styled(Col)`
  max-width: 128px;
  flex-shrink: 0;
  margin-top: 40px;
  margin-left: 40px;
  .logo {
    width: 100%;
  }
  @media (max-width: ${BreakPoints.loginLayoutPoint}px) {
    margin: 32px auto 0px auto;
  }
`;

export const Banner = styled.img`
  height: calc(100vh + 2px);
  margin-top: -1px;
  position: relative;
  left: 1px;
  user-select: none;
  @media (max-width: ${BreakPoints.loginLayoutPoint}px) {
    display: none;
  }
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
