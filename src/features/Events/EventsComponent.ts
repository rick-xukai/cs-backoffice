import styled from 'styled-components';
import { Colors } from '../../theme';

const EventsContainer = styled.div`
  padding: 24px;
  background: ${Colors.white};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  .ant-table-content {
    font-size: 15px;
    font-weight: 400;
  }
  .ant-table-thead {
    th {
      height: 40px;
      background: ${Colors.grey5};
      padding-top: 0;
      padding-bottom: 0;
      border-bottom: none;
      border-top-left-radius: unset;
      font-weight: 400;
      font-size: 14px;
      color: ${Colors.grey6};
      ::before {
        display: none;
      }
    }
  }
  .ant-table-tbody {
    td {
      padding-top: 10px;
      padding-bottom: 10px;
      p {
        margin-bottom: 0;
      }
    }
    .ant-table-row:hover {
      td {
        background: ${Colors.white};
      }
    }
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
  .ant-btn[disabled] {
    background: unset;
    color: ${Colors.grey7};
    :hover {
      a {
        text-decoration: unset;
      }
    }
  }
`;

export { EventsContainer };
