import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Row,
  Col,
  PageHeader,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
} from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';

const birthdayFormat = 'YYYY-MM-DD';
const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  string: {
    range: '${label} must be between ${min} and ${max} characters',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const websiteBeforeOptions = [
  {
    label: 'http://',
    value: 'http://',
  },
  {
    label: 'https://',
    value: 'https://',
  },
];
const websiteAfterOptions = [
  {
    label: '.com',
    value: '.com',
  },
  {
    label: '.cn',
    value: '.cn',
  },
  {
    label: '.org',
    value: '.org',
  },
];
const mixAge = 18;

const FormsValidation = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [websiteBefore, setWebsiteBefore] = useState(
    websiteBeforeOptions[0].value,
  );
  const [websiteAfter, setWebsiteAfter] = useState(
    websiteAfterOptions[0].value,
  );
  const routes = [
    {
      path: UserRoutes.forms.layouts,
      breadcrumbName: t('Forms'),
    },
    {
      path: '',
      breadcrumbName: t('Form Validation'),
    },
  ];
  const onReset = () => {
    form.resetFields();
    setWebsiteBefore(websiteBeforeOptions[0].value);
    setWebsiteAfter(websiteAfterOptions[0].value);
  };
  const selectBefore = (
    <Select
      value={websiteBefore}
      options={websiteBeforeOptions}
      onChange={(value) => setWebsiteBefore(value)}
    />
  );
  const selectAfter = (
    <Select
      value={websiteAfter}
      options={websiteAfterOptions}
      onChange={(value) => setWebsiteAfter(value)}
    />
  );
  return (
    <>
      <Helmet>
        <title>{`${t('Form Validation')} | CrowdServe BO`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Form Validation')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Card>
          <Form
            form={form}
            layout="vertical"
            scrollToFirstError
            validateMessages={validateMessages}
          >
            <Row gutter={24}>
              <Col span={24} sm={12} md={8}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col span={24} sm={12} md={8}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true },
                    { type: 'string', min: 6, max: 16 },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                </Form.Item>
              </Col>
              <Col span={24} sm={12} md={8}>
                <Form.Item
                  label="Confirm Password"
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!',
                          ),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              </Col>
              <Col span={24} sm={12} md={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={24} sm={12} md={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col span={24} sm={8} xl={4}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select" options={genderOptions} />
                </Form.Item>
              </Col>
              <Col span={24} sm={8} xl={4}>
                <Form.Item
                  label="Birthday"
                  name="birthday"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!value || moment().diff(value, 'years') >= mixAge) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(`Age must be greater than ${mixAge}!`),
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker placeholder="Select" format={birthdayFormat} />
                </Form.Item>
              </Col>
              <Col span={24} lg={12} xl={8}>
                <Form.Item label="Website" name="website">
                  <Input
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                    placeholder="Website"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Note" name="note">
                  <Input.TextArea
                    placeholder="Input Note"
                    allowClear
                    showCount
                    maxLength={100}
                    autoSize={{ minRows: 4, maxRows: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default FormsValidation;
