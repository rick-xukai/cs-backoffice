import React, { useState } from 'react';
import { Spin, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import {
  DraggetForm,
  ImageDragger,
  ImageHandlerContainer,
  ImageItem,
  ImagesContainer,
  SpinContainer,
  UploadIcon,
  UploadText,
} from './ImagesUpload.components';
import { Colors, Images } from '../../theme';
import { UploadFileAcceptType } from '../../constants/General';
import { useAppDispatch } from '../../app/hooks';
import { uploadFileAction } from './ImageUpload.slice';

export enum ImageSizes {
  small = 8,
  middle = 12,
  large = 24,
}
const IMAGE_UPLOAD_MAX_COUNT = 10;

const ImagesUpload = ({
  name,
  onChange,
  value,
}: {
  name?: string;
  onChange?: (files: any[]) => void;
  value?: any[];
}) => {
  const [imageList, setImageList] = useState<any>(value || []);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const imagesBeforeUpload = (file: any) => {
    const { type, size } = file;
    const isLimit =
      size / 1024 / 1024 <= 15 && UploadFileAcceptType.includes(type);
    if (!isLimit) {
      message.error(
        t(
          'Invalid file format or size. Please upload a PNG, JPEG, or GIF image that is up to 15 MB in size.',
        ),
      );
    }
    return isLimit;
  };

  const handleUploadImagesChange = (info: any) => {
    if (imagesBeforeUpload(info.file)) {
      let newFileList = [...info.fileList];
      newFileList = newFileList.map((file: any) => {
        const newFile = { ...file };
        if (file.response) {
          newFile.column = newFile.column || ImageSizes.large;
        }
        if (!info.event) {
          newFile.status = 'done';
        }
        return newFile;
      });
      setImageList(newFileList);
      if (onChange) {
        onChange(newFileList);
      }
    }
  };

  const handleRemoveImage = (index: number) => () => {
    imageList.splice(index, 1);
    setImageList([...imageList]);
  };

  const handleUpOrderImage = (index: number) => () => {
    if (!index) return;
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    newImageList.splice(index - 1, 0, imageList[index]);
    setImageList(newImageList);
  };

  const handleChangeSize = (index: any, size: any) => () => {
    let newSize = ImageSizes.large;
    if (size === ImageSizes.large) {
      newSize = ImageSizes.small;
    } else if (size === ImageSizes.small) {
      newSize = ImageSizes.middle;
    } else {
      newSize = ImageSizes.large;
    }
    const newImageList = [...imageList];
    newImageList[index].column = newSize;
    setImageList([...newImageList]);
  };

  const uploadImageRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      e.onSuccess(response.payload.url);
    } else {
      e.onError();
    }
  };

  return (
    <>
      <ImagesContainer gutter={[16, 16]}>
        {imageList.map((item: any, index: number) => (
          <ImageItem
            lg={item.column}
            sm={ImageSizes.large}
            xs={ImageSizes.large}
          >
            <div className="image-content">
              {item.response ? (
                <img src={item.response} alt="img" />
              ) : (
                <SpinContainer>
                  <Spin
                    spinning
                    indicator={<LoadingOutlined spin />}
                    size="large"
                    style={{ margin: 'auto' }}
                  />
                </SpinContainer>
              )}
              <div className="image-handler">
                <div className="handler-list">
                  {index ? (
                    <ImageHandlerContainer onClick={handleUpOrderImage(index)}>
                      <img src={Images.ImageUpwardIcon} alt="up" />
                    </ImageHandlerContainer>
                  ) : null}

                  <ImageHandlerContainer onClick={handleRemoveImage(index)}>
                    <img src={Images.ImageDeleteIcon} alt="delete" />
                  </ImageHandlerContainer>
                  <ImageHandlerContainer
                    onClick={handleChangeSize(index, item.column)}
                  >
                    <img src={Images.ImageChangeSizeIcon} alt="change" />
                  </ImageHandlerContainer>
                </div>
              </div>
            </div>
          </ImageItem>
        ))}
      </ImagesContainer>
      <DraggetForm
        label=""
        name={name}
        hidden={imageList.length >= IMAGE_UPLOAD_MAX_COUNT}
      >
        <ImageDragger
          accept="image/png, image/jpeg, image/gif"
          name={name}
          multiple
          onChange={handleUploadImagesChange}
          customRequest={uploadImageRequest}
          fileList={imageList}
          maxCount={IMAGE_UPLOAD_MAX_COUNT}
        >
          <>
            <UploadIcon>
              <PlusOutlined style={{ fontSize: 14, color: Colors.grey6 }} />
            </UploadIcon>
            <UploadText>{t('Drag or click to upload image')}</UploadText>
          </>
        </ImageDragger>
      </DraggetForm>
    </>
  );
};
export default ImagesUpload;
