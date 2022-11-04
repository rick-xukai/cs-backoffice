import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { Row, Col, Typography, Form, DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface.d';

const dateFormat = 'YYYY-MM-DD';

const ElementsDatePickers = () => {
  const [dates, setDates] = useState<RangeValue<Moment>>(null);
  const [hackValue, setHackValue] = useState<RangeValue<Moment>>(null);
  const [value, setValue] = useState<RangeValue<Moment>>(null);
  // eslint-disable-next-line complexity
  const disabledDate = (current: Moment) => {
    if (!dates || !dates.length) {
      return false;
    }
    const tooLate = !!dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = !!dates[1] && dates[1].diff(current, 'days') > 7;
    return tooEarly || tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([null, null]);
      setDates(null);
    } else {
      setHackValue(null);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={5}>Date Picker</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form>
            <Form.Item label="Default Picker">
              <Row gutter={[8, 8]}>
                <Col span={12} sm={6}>
                  <DatePicker />
                </Col>
                <Col span={12} sm={6}>
                  <DatePicker picker="week" />
                </Col>
                <Col span={12} sm={6}>
                  <DatePicker picker="month" />
                </Col>
                <Col span={12} sm={6}>
                  <DatePicker picker="quarter" />
                </Col>
                <Col span={12} sm={6}>
                  <DatePicker picker="year" />
                </Col>
                <Col span={12} md={6}>
                  <DatePicker showTime />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Range Picker">
              <Row gutter={[8, 8]}>
                <Col span={24} sm={12} lg={8} xl={6}>
                  <DatePicker.RangePicker />
                </Col>
                <Col span={24} sm={12} lg={8} xl={6}>
                  <DatePicker.RangePicker picker="week" />
                </Col>
                <Col span={24} sm={12} lg={8} xl={6}>
                  <DatePicker.RangePicker picker="month" />
                </Col>
                <Col span={24} sm={12} lg={8} xl={6}>
                  <DatePicker.RangePicker picker="quarter" />
                </Col>
                <Col span={24} sm={12} lg={8} xl={6}>
                  <DatePicker.RangePicker picker="year" />
                </Col>
                <Col span={24} lg={12}>
                  <DatePicker.RangePicker showTime />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Preset Range">
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <DatePicker.RangePicker
                    ranges={{
                      Today: [moment().startOf('day'), moment().endOf('day')],
                      'This Month': [
                        moment().startOf('month'),
                        moment().endOf('month'),
                      ],
                    }}
                  />
                </Col>
                <Col span={24}>
                  <DatePicker.RangePicker
                    showTime
                    ranges={{
                      Today: [moment().startOf('day'), moment().endOf('day')],
                      'This Month': [
                        moment().startOf('month'),
                        moment().endOf('month'),
                      ],
                    }}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Disable Range">
              <Row gutter={[8, 8]}>
                <Col span={24} md={12}>
                  <DatePicker.RangePicker
                    defaultValue={[
                      moment('2021-09-03', dateFormat),
                      moment('2021-11-22', dateFormat),
                    ]}
                    disabled
                  />
                </Col>
                <Col span={24} md={12}>
                  <DatePicker.RangePicker
                    defaultValue={[
                      moment('2021-09-03', dateFormat),
                      moment('2021-11-22', dateFormat),
                    ]}
                    disabled={[false, true]}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Disable Date">
              <Row gutter={[8, 8]}>
                <Col span={24} md={12}>
                  <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={(current) =>
                      current &&
                      (current < moment().endOf('day') ||
                        current.diff(moment(), 'days') > 7)
                    }
                  />
                </Col>
                <Col span={24} md={12}>
                  <DatePicker.RangePicker
                    format="YYYY-MM-DD"
                    value={hackValue || value}
                    disabledDate={disabledDate}
                    onCalendarChange={(val) => setDates(val)}
                    onChange={(val) => setValue(val)}
                    onOpenChange={onOpenChange}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ElementsDatePickers;
