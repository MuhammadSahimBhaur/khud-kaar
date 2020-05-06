import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import AdminAuth from '../hoc/adminauth';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';

// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';

import AdminLoginPage from './views/AdminLoginPage/AdminLoginPage.js';
import AdminRegisterPage from './views/AdminRegisterPage/AdminRegisterPage.js';
import AdminDashboard from './views/AdminDashboard/AdminDashboard.js';

import CartPage from './views/CartPage/CartPage';
import OrderConfirmationPage from './views/OrderConfirmationPage/OrderConfirmationPage.js';

import Blog from './views/Blog/Blog.js';
import UploadBlogPage from './views/UploadBlogPage/UploadBlogPage.js';
import DetailBlogPage from './views/DetailBlogPage/DetailBlogPage.js';

import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';

import UploadProductPage from './views/UploadProductPage/UploadProductPage';

import AboutUs from './views/AboutUs/AboutUs.js';
import ContactUs from './views/ContactUs/ContactUs';
import ContactUsConfirmation from './views/ContactUsConfirmation/ContactUsConfirmation';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />

          <Route exact path='/blog' component={Auth(Blog, null)} />

          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route
            exact
            path='/product/upload'
            component={AdminAuth(UploadProductPage, true)}
          />
          <Route
            exact
            path='/blog/upload'
            component={AdminAuth(UploadBlogPage, true)}
          />
          <Route
            exact
            path='/product/:productId'
            component={Auth(DetailProductPage, null)}
          />
          <Route
            exact
            path='/blog/:blogId'
            component={Auth(DetailBlogPage, null)}
          />
          <Route
            exact
            path='/admin/login'
            component={AdminAuth(AdminLoginPage, false)}
          />
          <Route
            exact
            path='/admin/register'
            component={AdminAuth(AdminRegisterPage, true)}
          />

          <Route
            exact
            path='/admin/admindashboard'
            component={AdminAuth(AdminDashboard, true)}
          />
          <Route
            exact
            path='/user/cart/orderconfirmation'
            component={Auth(OrderConfirmationPage, true)}
          />
          <Route exact path='/user/cart' component={Auth(CartPage, true)} />
          <Route
            exact
            path='/contactus/confirmation'
            component={Auth(ContactUsConfirmation, null)}
          />
          <Route exact path='/aboutus' component={Auth(AboutUs, null)} />
          <Route exact path='/contactus' component={Auth(ContactUs, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
