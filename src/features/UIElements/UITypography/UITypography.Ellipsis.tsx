import React, { useState } from 'react';
import { Card, Typography, Switch } from 'antd';

const { Paragraph, Text } = Typography;

const UITypographyEllipsis = () => {
  const [ellipsis, setEllipsis] = useState(true);

  return (
    <Card title="Ellipsis">
      <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
        style={{ marginBottom: 24 }}
      />

      <Paragraph ellipsis={ellipsis}>
        Ant Design, a design language for background applications, is refined by
        Ant UED Team. Ant Design, a design language for background applications,
        is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language
        for background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team.
        Design, a design language for background applications, is refined by Ant
        UED Team.
      </Paragraph>

      <Paragraph
        ellipsis={
          ellipsis ? { rows: 2, expandable: true, symbol: 'More' } : false
        }
      >
        Ant Design, a design language for background applications, is refined by
        Ant UED Team. Ant Design, a design language for background applications,
        is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language
        for background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team.
        Design, a design language for background applications, is refined by Ant
        UED Team.
      </Paragraph>

      <Text
        style={ellipsis ? { width: 100 } : undefined}
        ellipsis={ellipsis ? { tooltip: 'I am ellipsis now!' } : false}
      >
        Ant Design, a design language for background applications, is refined by
        Ant UED Team.
      </Text>
    </Card>
  );
};

export default UITypographyEllipsis;
