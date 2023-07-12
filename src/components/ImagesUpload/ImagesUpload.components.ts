import styled from 'styled-components';
import { Col, Form, Row, Upload } from 'antd';

import { Colors } from '../../theme';

const { Dragger } = Upload;

export const UploadIcon = styled.div`
  margin-bottom: 0;
  .anticon {
    color: ${Colors.grey7} !important;
  }
`;

export const UploadText = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${Colors.grey7};
`;

export const ImageDragger = styled(Dragger)`
  .ant-upload-btn {
    background: ${Colors.white};
  }
`;

export const DraggetForm = styled(Form.Item)`
  .ant-upload-list {
    display: none;
  }
`;

export const ImagesContainer = styled(Row)`
  /* margin-bottom: 16px; */
`;

export const ImageItem = styled(Col)`
  overflow: hidden;
  transition: 0.2s;
  img {
    width: 100%;
    object-fit: cover;
  }

  .image-handler {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 0.2s;
    left: 0;
    top: 0;
    opacity: 0;
    background: ${Colors.fadingBlack};
    .handler-list {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  .image-content {
    position: relative;
    min-height: 70px;
    :hover {
      .image-handler {
        opacity: 1;
      }
    }
  }
`;

export const ImageHandlerContainer = styled.div`
  width: 36px;
  height: 36px;
  background: ${Colors.fadingBlack2};
  border-radius: 50%;
  color: ${Colors.white};
  cursor: pointer;
  transition: 0.2s;
  img {
    width: 20px;
    display: block;
    margin: auto;
    margin-top: 8px;
    user-select: none;
    transition: 0.2s;
  }
  :hover {
    background: ${Colors.white};
    img {
      filter: invert(100%);
    }
  }
`;

export const SpinContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;
