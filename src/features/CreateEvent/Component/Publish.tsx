import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import Tips from '../../../components/Tips/Tips';
import { Images } from '../../../theme';

const Publish = () => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Publish')}
      </Col>
      <Col span={24}>
        <Row>
          <Col lg={(pageTipsShow && 14) || 21} span={24}></Col>
          <Col span={(pageTipsShow && 10) || 3}>
            <Tips
              title={t('Publish Tips')}
              image={Images.PublishTupsIcon}
              onSizeChange={setPageTipsShow}
              content={
                <Row>
                  <Col className="content-text" span={24}>
                    {t('Last Step!')}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `The last step to creating an amazing experience! Make sure to review your event information before publishing.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `Nothing gives off "Bad Event" vibes more than an obvious typo. "Best Party in Town" could be misspelled "Best Panty in Town". See how one letter makes all the difference?`,
                    )}
                  </Col>
                </Row>
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Publish;
