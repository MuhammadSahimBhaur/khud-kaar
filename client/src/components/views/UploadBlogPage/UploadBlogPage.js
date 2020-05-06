import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload(Blog)';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UploadBlogPage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (!TitleValue || !DescriptionValue || !Images) {
      return alert('fill all the fields first!');
    }

    const variables = {
      writer: props.admin.adminData._id,
      title: TitleValue,
      description: DescriptionValue,

      images: Images,
    };

    Axios.post('/api/blog/uploadBlog', variables).then((response) => {
      if (response.data.success) {
        alert('Blog Post Successfully Uploaded');
        props.history.push('/blog');
      } else {
        alert('Failed to upload Blog Post');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title style={{ paddingTop: '30px' }} level={2}>
          {' '}
          Upload Blog Post
        </Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />

        <br />
        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadBlogPage;
