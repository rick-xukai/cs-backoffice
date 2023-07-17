import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import Tips from '../../../components/Tips/Tips';
import { Images } from '../../../theme';

const Settings = () => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Settings')}
      </Col>
      <Col span={24}>
        <Row>
          <Col lg={(pageTipsShow && 14) || 21} span={24}></Col>
          <Col span={(pageTipsShow && 10) || 3}>
            <Tips
              title={t('Promocode Tips')}
              image={Images.PromoTipsIcon}
              onSizeChange={setPageTipsShow}
              content={
                <Row>
                  <Col span={24} className="content-text">
                    {t(
                      `(1) Set Promo Codes that are unique and not easily guessable.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(2) Promo Codes can be used to incentivise sales through discounts, but also help to track ticket sales through promoters or others.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(3) Ticket bundle promotions are highly effective for social events. Nobody likes going to events alone. Using bundle promotions effectively will help to drive ticket sales!`,
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

export default Settings;
