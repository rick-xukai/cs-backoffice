import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import {
  HighlightOutlined,
  SmileOutlined,
  SmileFilled,
} from '@ant-design/icons';

const { Paragraph } = Typography;

const UITypographyInteractive = () => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [customIconStr, setCustomIconStr] = useState(
    'Custom Edit icon and replace tooltip text.',
  );
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );

  return (
    <Card title="Interactive">
      <Paragraph editable={{ onChange: setEditableStr }}>
        {editableStr}
      </Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined />,
          tooltip: 'Click to edit text',
          onChange: setCustomIconStr,
        }}
      >
        {customIconStr}
      </Paragraph>
      <Paragraph editable={{ tooltip: false, onChange: setHideTooltipStr }}>
        {hideTooltipStr}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setLengthLimitedStr,
          maxLength: 50,
          autoSize: { maxRows: 5, minRows: 3 },
        }}
      >
        {lengthLimitedStr}
      </Paragraph>
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{ text: 'Hello, CrowdServe!' }}>
        Replace copy text.
      </Paragraph>
      <Paragraph
        copyable={{
          icon: [
            <SmileOutlined key="copy-icon" />,
            <SmileFilled key="copied-icon" />,
          ],
          tooltips: ['Click here', 'You clicked!'],
        }}
      >
        Custom Copy icon and replace tooltips text.
      </Paragraph>
      <Paragraph copyable={{ tooltips: false }}>Hide Copy tooltips.</Paragraph>
    </Card>
  );
};

export default UITypographyInteractive;
