import styled from 'styled-components';

import { Colors } from '../../theme';

const DashboardContainer = styled.div`
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .coming-soon-content {
      background: ${Colors.white};
      height: calc(100vh - 108px);
      .content-banner {
        display: flex;
        height: 100%;
        align-items: center;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
`;

export { DashboardContainer };
