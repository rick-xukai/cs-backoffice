import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

import { Colors } from '../../theme';

const Container = styled.div`
  display: flex;
  align-items: end;
  .ant-upload-picture-card-wrapper {
    width: unset;
    .ant-upload.ant-upload-select-picture-card {
      width: 150px;
      height: 150px;
    }
  }
  .ant-upload-list-picture-card-container {
    width: 150px;
    height: 150px;
  }
  .info {
    margin-left: 12px;
    font-weight: 400;
    font-size: 11px;
    color: ${Colors.grey7};
  }
  .ant-upload-list-item-name {
    color: ${Colors.grey6};
  }
  .thumbnail-image-required {
    font-weight: 400;
    font-size: 11px;
    color: ${Colors.grey7};
  }
  .anticon-eye {
    margin-top: 3px !important;
  }
  .upload-button-content {
    padding: 24px;
    .upload-button-text {
      margin-top: 6px;
    }
    .upload-button-text,
    .upload-button-icon {
      color: ${Colors.grey6};
      font-size: 13px;
      font-weight: 400;
    }
  }
`;

const UploadFileComponent = ({
  fileList = [],
  accept,
  previewImageUrl,
  previewType,
  description,
  limitFileSize,
  showPreviewIcon = true,
  customUploadButton = null,
  handleChange,
  customRequest,
  handleFileRemove,
  uploadButtonText,
  showVideoTip,
}: {
  accept: string;
  description: { type: string; size: string };
  previewImageUrl: string;
  previewType: string;
  limitFileSize: number;
  fileList?: [];
  showPreviewIcon?: boolean;
  customUploadButton?: React.ReactElement | null;
  handleChange: (event: any) => void;
  customRequest: (event: any) => void;
  handleFileRemove: () => void;
  uploadButtonText?: string;
  showVideoTip?: boolean;
}) => {
  const { t } = useTranslation();

  const [previewImageOpen, setPreviewImageOpen] = useState<boolean>(false);
  const [previewImageTitle, setPreviewImageTitle] = useState<string>('');
  const [isUpoloadError, setIsUpoloadError] = useState<boolean>(false);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImageOpen(true);
    setPreviewImageTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const beforeUpload = (file: RcFile) => {
    setIsUpoloadError(false);
    const isLimit = file.size / 1024 / 1024 < limitFileSize;
    if (!isLimit) {
      setIsUpoloadError(true);
      message.error(
        t(
          'The file you are trying to upload is too large. Please select a file that is under [size] in size.',
          { size: `${limitFileSize}M` },
        ),
      );
    }
    return isLimit;
  };

  return (
    <Container className="upload-content">
      {(customUploadButton && (
        <Upload
          name="file"
          listType="picture-card"
          maxCount={1}
          showUploadList={{ showPreviewIcon }}
          fileList={[]}
          accept={accept}
          customRequest={customRequest}
          beforeUpload={beforeUpload}
        >
          <div className="customUploadButtonContent">{customUploadButton}</div>
        </Upload>
      )) || (
        <Upload
          name="file"
          listType="picture-card"
          maxCount={1}
          showUploadList={{ showPreviewIcon }}
          fileList={(!isUpoloadError && fileList) || []}
          accept={accept}
          onChange={handleChange}
          onPreview={handlePreview}
          customRequest={customRequest}
          beforeUpload={beforeUpload}
          onRemove={handleFileRemove}
        >
          {(fileList.length === 0 || isUpoloadError) && (
            <div className="upload-button-content">
              <PlusOutlined className="upload-button-icon" />
              <div className="upload-button-text">
                {uploadButtonText || 'Upload'}
              </div>
            </div>
          )}
        </Upload>
      )}
      <div className="info">
        <p>{`${description.type} ${description.size}`}</p>
        {limitFileSize === 30 ||
          (showVideoTip && (
            <p className="thumbnail-image-required">
              {t(
                '(Plz note that a thumbnail image is required when uploading an mp4 file)',
              )}
            </p>
          ))}
      </div>
      <Modal
        open={previewImageOpen}
        title={previewImageTitle}
        footer={null}
        onCancel={() => setPreviewImageOpen(false)}
      >
        {(previewType.includes('image') && (
          <img alt="" style={{ width: '100%' }} src={previewImageUrl} />
        )) || (
          <video
            style={{ width: '100%' }}
            src={previewImageUrl}
            playsInline
            muted
            autoPlay
            loop
          />
        )}
      </Modal>
    </Container>
  );
};

export default UploadFileComponent;
