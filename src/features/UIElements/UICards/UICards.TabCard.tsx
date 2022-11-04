import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList: { [key: string]: any } = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const contentListNoTitle: { [key: string]: any } = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

const UICardsBasic = ({ t }: { t: any }) => {
  const [tabKeys, setTabKeys] = useState({
    key: 'tab1',
    noTitleKey: 'app',
  });
  return (
    <Card title={t('Tab Card')}>
      <Row justify="start" align="top" gutter={[20, 20]}>
        <Col span={24}>
          <Card
            title="Card title"
            extra={<Button>More</Button>}
            tabList={tabList}
            activeTabKey={tabKeys.key}
            onTabChange={(key: string) => {
              setTabKeys((prev) => ({
                ...prev,
                key,
              }));
            }}
          >
            {contentList[tabKeys.key]}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            tabList={tabListNoTitle}
            activeTabKey={tabKeys.noTitleKey}
            tabBarExtraContent={<Button>More</Button>}
            onTabChange={(noTitleKey: string) => {
              setTabKeys((prev) => ({
                ...prev,
                noTitleKey,
              }));
            }}
          >
            {contentListNoTitle[tabKeys.noTitleKey]}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default UICardsBasic;
