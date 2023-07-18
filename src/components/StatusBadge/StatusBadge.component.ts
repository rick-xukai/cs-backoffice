import styled from 'styled-components';
import { Colors } from '../../theme';
export type StatusBadgeType = 'success' | 'warning' | 'default';

const renderColor = (status?: StatusBadgeType) => {
  if (status === 'success')
    return { color: Colors.green1, background: Colors.green2 };
  if (status === 'warning')
    return { color: Colors.orange1, background: Colors.orange2 };
  return { color: Colors.grey6, background: Colors.grey8 };
};

export const Wrapper = styled.div<{ status?: StatusBadgeType }>`
  display: inline-flex;
  padding: 2px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 35px;
  flex-shrink: 0;
  background: ${(props) => renderColor(props.status).background};
  color: ${(props) => renderColor(props.status).color};
  .circle {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: ${(props) => renderColor(props.status).color};
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-weight: 700;
  }
`;
