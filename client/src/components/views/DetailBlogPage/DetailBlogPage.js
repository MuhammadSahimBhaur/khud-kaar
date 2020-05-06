import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col } from 'antd';
import BlogImage from './Sections/BlogImage';
import BlogInfo from './Sections/BlogInfo';
import { useDispatch } from 'react-redux';
function DetailBlogPage(props) {
  const dispatch = useDispatch();
  const blogId = props.match.params.blogId;
  const [Blog, setBlog] = useState([]);

  useEffect(() => {
    Axios.get(`/api/blog/blogs_by_id?id=${blogId}&type=single`).then(
      (response) => {
        setBlog(response.data[0]);
      }
    );
  }, []);

  return (
    <div className='postPage' style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <br />
        <br />
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <BlogImage detail={Blog} />
        </Col>
        <Col lg={12} xs={24}>
          <BlogInfo detail={Blog} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailBlogPage;
