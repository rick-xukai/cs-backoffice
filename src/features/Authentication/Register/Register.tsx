import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, Link } from 'react-router-dom';

import {
  Layout,
  Typography,
  Row,
  Col,
  Form,
  Input,
  Alert,
  message,
} from 'antd';
import { AuthRoutes } from '../../../navigation/Routes';
import LoadingCover from '../../../components/LoadingCover';
import { RegisterContainer, RegisterCard } from './Register.components';
import Images from '../../../theme/Images';
import Avatar from '../../../components/Avatar';
import PrimaryButton from '../../../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLoading, selectError, registerAction } from './Register.slice';

const { Content } = Layout;
const { Title } = Typography;

const CardTitle = () => (
  <div className="bg-primary bg-soft">
    <Row justify="start">
      <Col span={14} className="cart-title">
        <Title level={5}>Free Register</Title>
        <p>Get your free imaginato</p>
        <p>account now.</p>
      </Col>
      <Col span={10}>
        <img
          className="img-fluid "
          src={Images.dashboard.ProfileImg}
          alt="profile img"
        />
      </Col>
    </Row>
  </div>
);
const Register = () => {
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  const onFinish = async (values: any) => {
    const result = await dispatch(registerAction(values));
    if (result.type === registerAction.fulfilled.toString()) {
      message.success('Registered successfully！');
      history.replace(AuthRoutes.login);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Register | Imaginato Ui</title>
      </Helmet>
      <Layout hasSider={false} style={{ minHeight: '100vh' }}>
        <Content>
          <RegisterContainer justify="center" align="top">
            <Col sm={16} xs={22}>
              <RegisterCard title={<CardTitle />}>
                <Avatar src={Images.LogoSMLight} size={72} />
                <Form name="register-form" onFinish={onFinish}>
                  {error ? (
                    <Alert
                      message="Register User Successfully"
                      type="success"
                    ></Alert>
                  ) : null}
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            required: true,
                            message: 'Enter email',
                          },
                        ]}
                      >
                        <Input placeholder="Your email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="UserName"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: 'Enter username',
                          },
                        ]}
                      >
                        <Input placeholder="Enter username" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Enter password',
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        labelCol={{ span: 24 }}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
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
                        <Input.Password />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item>
                        <PrimaryButton
                          block
                          htmlType="submit"
                          loading={loading}
                        >
                          Register
                        </PrimaryButton>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <p className="login">
                    Aready have an account ?{' '}
                    <Link
                      to={AuthRoutes.login}
                      className="fw-medium text-primary"
                    >
                      Login
                    </Link>
                  </p>
                </Row>
              </RegisterCard>
            </Col>
          </RegisterContainer>
        </Content>
      </Layout>
      <LoadingCover show={loading} />
    </div>
  );
};

export default Register;
