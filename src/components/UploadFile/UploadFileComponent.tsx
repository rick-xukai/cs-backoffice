import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

import { Colors } from '../../theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  .ant-upload-picture-card-wrapper {
    width: unset;
  }
  .info {
    margin-left: 12px;
    font-weight: 400;
    font-size: 15px;
    color: ${Colors.grey7};
  }
`;

const UploadFileComponent = ({
  fileList,
  accept,
  previewImageUrl,
  description,
  limitFileSize,
  handleChange,
  customRequest,
}: {
  fileList: [];
  accept: string;
  description: { type: string; size: string };
  previewImageUrl: string;
  limitFileSize: number;
  handleChange: (event: any) => void;
  customRequest: (event: any) => void;
}) => {
  const { t } = useTranslation();

  const [previewImageOpen, setPreviewImageOpen] = useState<boolean>(false);
  const [previewImageTitle, setPreviewImageTitle] = useState<string>('');

  const handlePreview = async (file: UploadFile) => {
    setPreviewImageOpen(true);
    setPreviewImageTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const beforeUpload = (file: RcFile) => {
    const isLimit = file.size / 1024 / 1024 < limitFileSize;
    if (!isLimit) {
      message.error(
        t(
          'The file you are trying to upload is too large. Please select a file that is under 5MB in size.',
          { size: `${limitFileSize}M` },
        ),
      );
    }
    return isLimit;
  };

  return (
    <Container>
      <Upload
        name="file"
        listType="picture-card"
        maxCount={1}
        showUploadList
        fileList={fileList}
        accept={accept}
        onChange={handleChange}
        onPreview={handlePreview}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
      >
        {fileList.length === 0 && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <div className="info">
        <p>{description.type}</p>
        <p>{description.size}</p>
      </div>
      <Modal
        open={previewImageOpen}
        title={previewImageTitle}
        footer={null}
        onCancel={() => setPreviewImageOpen(false)}
      >
        <img alt="" style={{ width: '100%' }} src={previewImageUrl} />
      </Modal>
    </Container>
  );
};

export default UploadFileComponent;
