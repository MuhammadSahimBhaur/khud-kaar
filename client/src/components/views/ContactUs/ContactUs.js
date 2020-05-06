import React, { useEffect, useState } from 'react';
import { Result, Empty, Button } from 'antd';

const ContactUs = (props) => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState('');
  const [cart, setCart] = useState([]);

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    const templateId = 'template_PuBcrRex_clone';

    sendFeedback(templateId, {
      message_html: feedback,
      cus_name: name,
      reply_to: email,
      cus_subject: subject,
      cus_body: body,
      cus_email: email,

      to_name: 'Admin',
    });

    props.history.push('/contactus/confirmation');
  };

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send('gmail', templateId, variables)
      .then((res) => {
        console.log('Email successfully sent!');
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          'Oh well, you failed. Here some thoughts on the error that occured:',
          err
        )
      );
  };
  const handleChange = (event) => {
    if (event.target.name == 'firstname') {
      setName(event.target.value);
    } else if (event.target.name == 'email') {
      setEmail(event.target.value);
    } else if (event.target.name == 'subject') {
      setSubject(event.target.value);
    } else if (event.target.name == 'body') {
      setBody(event.target.value);
    }
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <form className='test-mailing'>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h3>Contact Us</h3>
          <label htmlFor='fname'>
            <i className='fa fa-user'></i> Full Name
          </label>
          <input
            onChange={handleChange}
            type='text'
            id='fname'
            name='firstname'
            placeholder='John M. Doe'
            value={name}
          />
          <label htmlFor='email'>
            <i className='fa fa-envelope'></i> Email
          </label>
          <input
            onChange={handleChange}
            type='text'
            id='email'
            name='email'
            placeholder='john@example.com'
            value={email}
          />
          <label htmlFor='adr'>
            <i className='fa fa-address-card-o'></i> Subject
          </label>
          <input
            onChange={handleChange}
            type='text'
            id='adr'
            name='subject'
            placeholder='Subject'
            value={subject}
          />
          <label htmlFor='city'>
            <i className='fa fa-institution'></i> Body
          </label>
          <textarea
            onChange={handleChange}
            type='text'
            id='city'
            name='body'
            placeholder='Message Body'
            value={body}
          />
        </div>
      </form>
      <br />
      <br />
      <Button size='large' shape='round' type='success' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ContactUs;
