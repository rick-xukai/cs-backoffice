import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import Tips, { Sizes } from '../../../components/Tips/Tips';
import { Images } from '../../../theme';

const CreateTicket = () => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Create Ticket')}
      </Col>
      <Col span={24}>
        <Row>
          <Col lg={(pageTipsShow && 14) || 21} span={24}></Col>
          <Col span={(pageTipsShow && 10) || 3}>
            <Tips
              title={t('Ticket Tips')}
              image={Images.ProfileTipsBg}
              onSizeChange={(val) => setPageTipsShow(val === Sizes.normal)}
              content={
                <Row>
                  <Col span={24} className="content-text">
                    {t(
                      `(1) Don't give your ticket fancy names. If it's general admission, it's general admission. If it's VIP, it's VIP. Don't give names like bronze, silver or gold. Ain't nobody got time to get your colours.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(2) Your image is where you stand out. Remember our tickets are digital collectibles. So make them look like they mean something. The experience begins the moment the attendee receives the ticket. So make that moment count. Contact us if you need design help.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(3) Proof read your ticket description. You don't want angry Karens asking why they didn't receive another drink coupon.scribes a unique organizer and shows all of their events on one page. Having a complete profile can encourage attendees to follow you.`,
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

export default CreateTicket;
