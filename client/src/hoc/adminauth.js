/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { adminauth } from '../_actions/admin_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function (ComposedClass, reload, adminRoute = null) {
  function AuthenticationCheck(props) {
    let admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(adminauth()).then((response) => {
        if (!response.payload.isAuth) {
          if (reload) {
            props.history.push('/admin/login');
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/admindashboard');
          } else {
            if (reload === false) {
              props.history.push('/admindashboard');
            }
          }
        }
      });
    }, []);

    return <ComposedClass {...props} admin={admin} />;
  }
  return AuthenticationCheck;
}
