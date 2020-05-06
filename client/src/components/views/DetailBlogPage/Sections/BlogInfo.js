import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';
import Blog from '../../Blog/Blog';

function BlogInfo(props) {
  const [Blog, setBlog] = useState({});

  useEffect(() => {
    setBlog(props.detail);
  }, [props.detail]);

  function contentToHtml(text) {
    if (text != undefined) {
      return text
        .split('\n\n')
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join('');
    }
  }

  return (
    <div>
      {/* <Descriptions title={Blog.title}>
        <Descriptions.Item label='Description'>
          {' '}
          {Product.description}
        </Descriptions.Item>
      </Descriptions> */}
      <h2 style={{ fontFamily: 'Roboto', fontSize: '26px' }}>{Blog.title}</h2>
      <div>
        <div
          style={{
            fontFamily: 'Roboto',
            fontSize: '20px',
          }}
        >
          <p style={{ whiteSpace: 'pre-line' }}>{Blog.description}</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
    </div>
  );
}

export default BlogInfo;
