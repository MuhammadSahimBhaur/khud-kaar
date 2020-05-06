import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty, Button } from 'antd';
import Axios from 'axios';
// import Paypal from '../../utils/Paypal';
function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState('');
  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  //   this.state = { feedback: '', name: 'Name', email: 'email@example.com' };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            if (response.payload.length > 0) {
              calculateTotal(response.payload);
            }
          }
        );
      }
    }
  }, [props.user.userData]);

  const emailOrderDetails = (cartDetail, total) => {
    var orderString = '';
    cartDetail.map((item) => {
      orderString =
        orderString +
        '<br><br><br>' +
        'Item Title: ' +
        item.title +
        '<br>' +
        'Item Description: ' +
        item.description +
        '<br>' +
        'Item Price: ' +
        item.price +
        '<br>' +
        'Item Quantity: ' +
        item.quantity;
    });
    orderString =
      orderString + '<br><br><br><br>' + 'Total: RS.' + total + '<br><br><br>';
    setOrder(orderString);
  };

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
    emailOrderDetails(cartDetail, total);
    setCart(cartDetail);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.cartDetail.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(response.payload.cartDetail);
      }
    });
  };

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        cartDetail: props.user.cartDetail,
        paymentData: data,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowSuccess(true);
        setShowTotal(false);
      }
    });
  };

  const transactionError = () => {
    console.log('Paypal error');
  };

  const transactionCanceled = () => {
    console.log('Transaction canceled');
  };

  const handleChange = (event) => {
    if (event.target.name == 'firstname') {
      setName(event.target.value);
    } else if (event.target.name == 'email') {
      setEmail(event.target.value);
    } else if (event.target.name == 'address') {
      setAddress(event.target.value);
    } else if (event.target.name == 'city') {
      setCity(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    const templateId = 'template_PuBcrRex';

    sendFeedback(templateId, {
      message_html: feedback,
      cus_name: name,
      reply_to: email,
      cus_city: city,
      cus_address: address,
      cus_email: email,
      cus_order: order,
      to_name: 'Admin',
    });
    cart.map((item) => {
      removeFromCart(item._id);
    });
    props.history.push('/user/cart/orderconfirmation');
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

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ marginTop: '3rem' }}>
            <h2>Total amount: RS.{Total} </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status='success' title='Successfully Purchased Items' />
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>

      {/* Paypal Button */}

      {ShowTotal && (
        <div>
          <form className='test-mailing'>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3>Billing Address</h3>
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
                <i className='fa fa-address-card-o'></i> Address
              </label>
              <input
                onChange={handleChange}
                type='text'
                id='adr'
                name='address'
                placeholder='542 W. 15th Street'
                value={address}
              />
              <label htmlFor='city'>
                <i className='fa fa-institution'></i> City
              </label>
              <input
                onChange={handleChange}
                type='text'
                id='city'
                name='city'
                placeholder='New York'
                value={city}
              />
              {/* <textarea
                id='test-mailing'
                name='test-mailing'
                onChange={handleChange}
                placeholder='Post some lorem ipsum here'
                required
                value={feedback}
                style={{ width: '100%', height: '150px' }}
              /> */}
            </div>
            {/* <input
              type='button'
              value='Submit'
              className='btn btn--submit'
              onClick={handleSubmit}
            /> */}
          </form>

          <Button
            size='large'
            shape='round'
            type='success'
            onClick={handleSubmit}
            //   toPay={Total}
            //   onSuccess={transactionSuccess}
            //   transactionError={transactionError}
            //   transactionCanceled={transactionCanceled}
          >
            Confirm Order
          </Button>
        </div>
      )}
    </div>
  );

  //   <Paypal
  //   toPay={Total}
  //   onSuccess={transactionSuccess}
  //   transactionError={transactionError}
  //   transactionCanceled={transactionCanceled}
  // />
}

export default CartPage;
