import styled from 'styled-components';
import { Colors } from '../../theme';

const TicketsContainer = styled.div`
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
  }
  .name-btn {
    border: none;
    padding: 0;
    height: auto;
    color: ${Colors.branding};
    transition: unset;
    :hover {
      a {
        text-decoration: underline;
      }
    }
  }
  .search-bar {
    margin-bottom: 24px;
    .ant-input-affix-wrapper {
      height: 40px;
    }
    .ant-input-suffix {
      cursor: pointer;
    }
    .anticon,
    .ant-input-clear-icon {
      font-size: 16px;
      color: ${Colors.black5};
    }
  }
  @media (max-width: 992px) {
    .page-main {
      padding: calc(98px + 24px) 24px 24px;
    }
  }
`;

export { TicketsContainer };
