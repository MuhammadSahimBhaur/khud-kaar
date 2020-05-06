//TODO
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function Blog() {
  const [Blogs, setBlogs] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getBlogs(variables);
  }, []);

  const getBlogs = (variables) => {
    Axios.post('/api/blog/getBlogs', variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setBlogs([...Blogs, ...response.data.blogs]);
        } else {
          setBlogs(response.data.blogs);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('Failed to fetch blog data');
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getBlogs(variables);
    setSkip(skip);
  };

  const renderCards = Blogs.map((blog, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/blog/${blog._id}`}>
              {' '}
              <ImageSlider images={blog.images} />
            </a>
          }
        >
          {/* description={`RS.${product.price}`} */}
          <Meta title={blog.title} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getBlogs(variables);
    setSkip(0);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      {/* <div style={{ textAlign: 'center', paddingTop: '30px' }}> */}
      <div style={{ textAlign: 'center' }}>
        <h2>
          {' '}
          Let's Fight Poverty! <Icon type='rocket' />{' '}
        </h2>
      </div>

      {/* Filter  */}

      {/* Search  */}

      {Blogs.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />

      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default Blog;
