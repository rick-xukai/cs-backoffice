import React from 'react';
import styled from 'styled-components';
import { Upload, Image, Col } from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Images, Colors } from '../../theme';

const { Dragger } = Upload;

const DraggerUploadContainer = styled.div`
  .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: ${Colors.grey4};
  }
  .dragger-content {
    position: relative;
    &.ant-upload-drag {
      min-height: 123px;
      display: flex;
      align-items: center;
      .ant-upload-drag-icon {
        margin-bottom: 0;
        .anticon {
          font-size: 18px;
          color: ${Colors.grey7};
        }
      }
      .ant-upload-text {
        font-size: 13px;
        font-weight: 400;
        color: ${Colors.grey7};
      }
    }
    .ant-upload {
      padding: 0;
    }
    .content-preview {
      position: relative;
      width: 100%;
      height: 123px;
      :hover {
        .content-action-icon {
          display: flex;
        }
      }
      .content-action-icon {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        > :last-child {
          img {
            margin-right: 0;
          }
        }
        img {
          width: 36px;
          height: 36px;
          cursor: pointer;
          margin-right: 20px;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

const DraggerUpload = ({
  draggerUploadProps,
  draggerUploadFile,
  previewAction,
  deleteAction,
}: {
  draggerUploadProps: UploadProps;
  draggerUploadFile: string;
  previewAction: () => void;
  deleteAction: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <DraggerUploadContainer>
      <Dragger {...draggerUploadProps} className="dragger-content">
        {(draggerUploadFile && (
          <Col className="content-preview" onClick={(e) => e.stopPropagation()}>
            <img src={draggerUploadFile} alt="" />
            <div className="content-action-icon">
              <Image
                src={Images.PreviewEye}
                alt=""
                preview={false}
                onClick={previewAction}
              />
              <Image
                src={Images.DeleteIcon}
                alt=""
                preview={false}
                onClick={deleteAction}
              />
            </div>
          </Col>
        )) || (
          <>
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">
              {t('Drag or click to upload image')}
            </p>
          </>
        )}
      </Dragger>
    </DraggerUploadContainer>
  );
};

export default DraggerUpload;
