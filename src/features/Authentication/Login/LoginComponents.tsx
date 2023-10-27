import styled from 'styled-components';

import { Colors } from '../../../theme';

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

export const ScannerError = styled.div`
  color: ${Colors.branding2};
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const PageContainer = styled.div`
  .scanner-error {
    margin-bottom: 0;
    .ant-input-affix-wrapper {
      border-color: ${Colors.branding2} !important;
    }
  }
`;
