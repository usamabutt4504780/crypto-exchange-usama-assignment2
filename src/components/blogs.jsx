import React, { useState } from 'react';
import { Table, Button, Form, Input, Modal, InputNumber, Popconfirm, Typography } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const initialData = [];

for( let i=0; i<50; i++){
  initialData.push({
    blogId: uuidv4(),
    title: `Blog ${i}`,
    subtitle: `Sub Title ${i}`,
    author: `Author ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BlogsPage = ({ editBlog, deleteBlog, addBlog }) => {

  const [isModalVisible, setIsModalVisible] = useState();
  const [form] = Form.useForm();

  const [ blogsData, setBlogsData ] = useState(initialData);
  const [editingKey, setEditingKey] = useState('');


  const isEditing = (record) => record.blogId=== editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      title: '',
      subtitle: '',
      author: '',
      ...record,
    });
    setEditingKey(record.blogId);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...blogsData];
      const index = newData.findIndex((item) => id === item.blogId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setBlogsData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setBlogsData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (id) => {
    const newBlog = blogsData.filter((blog) => blog.blogId !== id);
    setBlogsData(newBlog);
  }

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newBlog = {
        blogId: uuidv4(),
        title: values.title,
        subtitle: values.subtitle,
        author: values.author,
      };
      setBlogsData([...blogsData, newBlog]);
      form.resetFields();
      setIsModalVisible(false);
    });
  };


  const columns = [
    {
      title: 'Blog Id',
      dataIndex: 'blogId',
      key: 'blogId',
      width: '20%'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      width: '15%'
    },
    {
      title: 'Sub Title',
      dataIndex: 'subtitle',
      key: 'subtitle',
      editable: true,
      width: '15%'
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      editable: true,
      width: '15%'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, blog) => {
        const editable = isEditing(blog);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(blog.blogId)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <Button disabled={editingKey !== ''} style={{color: 'blue'}}  icon={<EditFilled/>} onClick={() => edit(blog)}>
          <span style={{marginLeft:'3px'}}>Edit</span>
          </Button>
          <Button disabled={editingKey !== ''} style={{color: 'red', marginLeft:'5px'}} icon={<DeleteFilled/>}>
            {blogsData?.length >= 1 ?(
              <Popconfirm title="Sure to delete?" onConfirm={()=>handleDelete(blog.blogId)}>
              <span style={{marginLeft:'3px'}}>Delete</span>
            </Popconfirm>
            ) : null}
          </Button>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div style={{ marginBottom: '16px', marginTop: '10px', display: 'flex', justifyContent: 'right', marginRight: '15px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add
        </Button>
      </div>
      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={blogsData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 5
        }} />
        </Form>

      <Modal
        title="Add Blog"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Subtitle"
            rules={[{ required: true, message: 'Please enter the subtitle' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter the author' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BlogsPage;
