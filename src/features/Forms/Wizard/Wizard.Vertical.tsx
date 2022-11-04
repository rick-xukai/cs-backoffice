import React, { useState, ReactNode } from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Steps,
  Space,
  Button,
  message,
} from 'antd';
import styled from 'styled-components';

import Step1 from './Contents/Step1';
import Step2 from './Contents/Step2';
import Step3 from './Contents/Step3';

const StepBox = styled.div`
  display: flex;
`;
const StepContent = styled.div`
  flex: 1 0 auto;
  width: 70%;
  margin: 0 0 20px;
`;
const StepAction = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface IStepItem {
  title: string;
  content: ReactNode;
}

const steps = [
  {
    title: 'Seller Details',
    content: <Step1 />,
  },
  {
    title: 'Company Document',
    content: <Step2 />,
  },
  {
    title: 'Bank Details',
    content: <Step3 />,
  },
];

const WizardVertical = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = () => {
    message.success('Processing complete!');
  };

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={5}>Vertical Wizard</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form layout="vertical" onFinish={onFinish}>
            <StepBox>
              <Steps
                direction="vertical"
                current={current}
                onChange={(value) => setCurrent(value)}
              >
                {steps.map((item: IStepItem) => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <StepContent>{steps[current].content}</StepContent>
            </StepBox>
            <StepAction>
              <Space>
                {current > 0 && <Button onClick={prev}>Previous</Button>}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={next}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" htmlType="submit">
                    Done
                  </Button>
                )}
              </Space>
            </StepAction>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default WizardVertical;
