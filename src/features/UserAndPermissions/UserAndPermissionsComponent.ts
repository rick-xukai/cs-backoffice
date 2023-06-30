import styled from 'styled-components';

import { Colors } from '../../theme';

const UserAndPermissionsContainer = styled.div`
  padding: calc(60px + 24px) 24px 24px;
  background: ${Colors.grey5};
  .page-main {
    background: ${Colors.white};
    border-radius: 2px;
    .main-title {
      padding: 16px 20px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 700;
      color: ${Colors.black4};
      border-bottom: 0.6px solid ${Colors.grey8};
    }
    .ant-table-thead th {
      height: 30px;
      background: ${Colors.white2};
      font-size: 12px;
      font-weight: 700;
      color: ${Colors.black6};
    }
  }
`;

export { UserAndPermissionsContainer };
