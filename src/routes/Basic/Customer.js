import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const { confirm } = Modal;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'success'];
const status = ['停用', '启用'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible, id, name } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEdit(id, fieldsValue);
    });
  };
  return (
    <Modal
      title={id > 0 ? "编辑客户":"新建客户"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户名称">
        {form.getFieldDecorator('name', {
          initialValue: name,
          rules: [{ required: true, message: '请输入客户名称' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ customer, loading }) => ({
  customer,
  submitting: loading.effects['customer/fetch'],
  loading: loading.models.customer,
}))

@Form.create()
export default class Customer extends PureComponent {
  state = {
    id: 0,
    name: '',
    modalVisible: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'customer/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'customer/fetch',
      payload: {},
    });
  };

  handleRefresh = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'customer/fetch', payload: {} });
    this.setState({ selectedRows: [] });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        confirm({
          title: '您确定要删除所有选中的记录吗?',
          onOk() {
            dispatch({
              type: 'customer/remove',
              payload: { id: selectedRows.map(row => row.id).join(',') },
              callback: () => { this.handleRefresh(); },
            });
          },
        });
        break;
      case 'activate':
        dispatch({
          type: 'customer/activate',
          payload: { id: selectedRows.map(row => row.id).join(',') },
          callback: () => { this.handleRefresh(); },
        });
        break;
      case 'deactivate':
        dispatch({
          type: 'customer/deactivate',
          payload: { id: selectedRows.map(row => row.id).join(',') },
          callback: () => { this.handleRefresh(); },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({ selectedRows: rows });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = fieldsValue;

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'customer/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({ modalVisible: !!flag });
  };

  handleNew = () => {
    this.setState({ modalVisible: true, id: 0, name: '' });
  };

  handleEdit = (_id, fields) => {
    this.props.dispatch({
      type: _id > 0 ? 'customer/update_name' : 'customer/add',
      payload: {
        id: _id,
        name: fields.name,
      },
      callback: () => { this.handleRefresh(); },
    });

    this.setState({ modalVisible: false });

    message.success(_id > 0 ? '更新成功' : '添加成功');
  };

  handleUpdateStatus = (record, e) => {
    e.preventDefault();

    this.props.dispatch({
      type: 'customer/update_status',
      payload: {
        id: record.id,
        activated: record.activated ? 0 : 1,
      },
      callback: () => { this.handleRefresh(); },
    });
  };

  handleUpdateName = (record, e) => {
    e.preventDefault();

    this.setState({ modalVisible: true, id: record.id, name: record.name });
  };

  handleDeleteCustomer = (record, e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const self = this;
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk() {
        dispatch({
          type: 'customer/delete',
          payload: {
            id: record.id,
          },
          // callback: () => { self.handleRefresh(); },
        }).then(() => {
          self.handleRefresh()
        })
      },
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="客户名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="启用状态">
              {getFieldDecorator('activated')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">停用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { customer: { data }, loading } = this.props;
    const { selectedRows, modalVisible, id, name } = this.state;

    const columns = [
      {
        title: '客户名称',
        dataIndex: 'name',
      },
      {
        title: '启用状态',
        dataIndex: 'activated',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
        ],
        onFilter: (value, record) => record.activated.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a href="#" onClick={e => this.handleUpdateName(record, e)}>编辑</a>
            <Divider type="vertical" />
            <a href="#" onClick={e => this.handleDeleteCustomer(record, e)}>删除</a>
            <Divider type="vertical" />
            <a href="#" onClick={e => this.handleUpdateStatus(record, e)}>{record.activated? "停用" : "启用"}</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
        <Menu.Item key="activate">批量启用</Menu.Item>
        <Menu.Item key="deactivate">批量停用</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="客户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleNew()}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} id={id} name={name} />
      </PageHeaderLayout>
    );
  }
}
