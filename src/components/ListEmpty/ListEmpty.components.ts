import styled from 'styled-components';
import { Colors } from '../../theme';

export const Warapper = styled.div`
  max-width: 422px;
  margin: 100px auto;
`;

export const Image = styled.img`
  display: block;
  margin: auto;
  margin-bottom: 32px;
`;

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 4px;
  color: ${Colors.black4};
  text-align: center;
`;

export const Desctiption = styled.p`
  color: ${Colors.grey6};
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 32px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;
