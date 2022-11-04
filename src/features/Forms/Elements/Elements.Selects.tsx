import React from 'react';
import { Row, Col, Typography, Form, Select } from 'antd';

const options = [
  {
    label: 'Gold',
    value: 'gold',
  },
  {
    label: 'Lime',
    value: 'lime',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Cyan',
    value: 'cyan',
  },
];

const ElementsSelects = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Selects</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form
          initialValues={{
            defaultSelect: 'green',
            searchSelect: 'gold',
            multipleSelect: ['lime', 'green'],
            tagsSelect: ['lime', 'test'],
            customSelect: 'china',
          }}
        >
          <Form.Item label="Default Select" name="defaultSelect">
            <Select options={options} />
          </Form.Item>
          <Form.Item label="Search Select" name="searchSelect">
            <Select showSearch options={options} />
          </Form.Item>
          <Form.Item label="Clear Select" name="clearSelect">
            <Select allowClear options={options} placeholder="Please select" />
          </Form.Item>
          <Form.Item label="Multiple Select" name="multipleSelect">
            <Select
              mode="multiple"
              showArrow
              options={options}
              placeholder="Please select"
            />
          </Form.Item>
          <Form.Item label="Tags Select" name="tagsSelect">
            <Select mode="tags" options={options} />
          </Form.Item>
          <Form.Item label="Custom Option" name="customSelect">
            <Select optionLabelProp="label">
              <Select.Option value="china" label="China">
                <div>
                  <span
                    role="img"
                    aria-label="China"
                    style={{ marginRight: 5 }}
                  >
                    🇨🇳
                  </span>
                  China
                </div>
              </Select.Option>
              <Select.Option value="usa" label="USA">
                <div>
                  <span role="img" aria-label="USA" style={{ marginRight: 5 }}>
                    🇺🇸
                  </span>
                  USA
                </div>
              </Select.Option>
              <Select.Option value="japan" label="Japan">
                <div>
                  <span
                    role="img"
                    aria-label="Japan"
                    style={{ marginRight: 5 }}
                  >
                    🇯🇵
                  </span>
                  Japan
                </div>
              </Select.Option>
              <Select.Option value="korea" label="Korea">
                <div>
                  <span
                    role="img"
                    aria-label="Korea"
                    style={{ marginRight: 5 }}
                  >
                    🇰🇷
                  </span>
                  Korea
                </div>
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsSelects;
