import { Col, Row, Grid } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CloseIcon,
  Container,
  MiniContainer,
  MiniSize,
} from './Tips.components';
import { Images } from '../../theme';

export enum Sizes {
  normal = 'normal',
  mini = 'mini',
}

export type TipsProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  image?: string;
  hideClose?: boolean;
  onSizeChange?: (size: boolean) => void;
};
const { useBreakpoint } = Grid;
const Tips = ({
  title,
  content,
  image,
  hideClose,
  onSizeChange,
}: TipsProps) => {
  const { lg } = useBreakpoint();
  const [size, setSize] = useState<null | Sizes>(null);
  const { t } = useTranslation();
  const handleChangeSize = (sizes: Sizes) => () => {
    setSize(sizes);
    if (onSizeChange) {
      onSizeChange(sizes === Sizes.normal);
    }
  };
  const clickHandle = () => {
    handleChangeSize(Sizes.mini)();
  };

  useEffect(() => {
    if (typeof lg !== 'undefined') {
      if (lg === false) {
        document.addEventListener('click', clickHandle);
        document.addEventListener('scroll', clickHandle);
        handleChangeSize(Sizes.mini)();
      } else {
        handleChangeSize(Sizes.normal)();
        document.removeEventListener('click', clickHandle);
        document.removeEventListener('scroll', clickHandle);
      }
    }
    return () => {
      document.removeEventListener('click', clickHandle);
      document.removeEventListener('scroll', clickHandle);
    };
  }, [lg]);

  if (!size) return null;
  return size === Sizes.mini ? (
    <MiniSize lg={3} xs={24} sm={24}>
      <MiniContainer
        onClick={(e) => {
          e.stopPropagation();
          handleChangeSize(Sizes.normal)();
        }}
      >
        <img src={image} alt="" />
        <p>{t('Tips')}</p>
      </MiniContainer>
    </MiniSize>
  ) : (
    <Container
      span={24}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="tips-content">
        <Row>
          <Col span={24} className="tips-content-title">
            <Row justify="space-between">
              <Col>{title}</Col>
              {hideClose ? null : (
                <Col>
                  <CloseIcon
                    src={Images.CloseIcon}
                    onClick={handleChangeSize(Sizes.mini)}
                  />
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24} className="tips-content-value">
            {content}
          </Col>
          {image ? (
            <Col span={24} className="tips-content-image">
              <img src={image} alt="" />
            </Col>
          ) : null}
        </Row>
      </div>
    </Container>
  );
};
export default Tips;
