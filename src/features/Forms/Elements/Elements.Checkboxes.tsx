import React, { useState } from 'react';
import { Row, Col, Typography, Form, Checkbox, Divider } from 'antd';

const options = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const ElementsCheckboxes = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={5}>Checkboxes</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            layout="vertical"
            initialValues={{
              checkboxGroup: ['Pear'],
            }}
          >
            <Form.Item label="Default Checkbox">
              <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            <Form.Item label="Checkbox Group" name="checkboxGroup">
              <Checkbox.Group options={options} />
            </Form.Item>
            <Form.Item label="Select All">
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                Check all
              </Checkbox>
              <Divider style={{ margin: '10px 0' }} />
              <Checkbox.Group
                options={options}
                value={checkedList}
                onChange={onChange}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ElementsCheckboxes;
