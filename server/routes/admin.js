const express = require('express');
const router = express.Router();
const { Admin } = require('../models/Admin');

const { auth } = require('../middleware/auth');
const { authadmin } = require('../middleware/authadmin');

//=================================
//             Admin
//=================================

router.get('/auth', authadmin, (req, res) => {
  res.status(200).json({
    _id: req.admin._id,
    isAdmin: req.admin.role === 0 ? false : true,
    isAuth: true,
    email: req.admin.email,
    name: req.admin.name,
    lastname: req.admin.lastname,
    role: req.admin.role,
    image: req.admin.image,
  });
});

router.post('/register', (req, res) => {
  const admin = new Admin(req.body);

  admin.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/login', (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if (!admin)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    admin.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      admin.generateToken((err, admin) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', admin.tokenExp);
        res.cookie('w_auth', admin.token).status(200).json({
          loginSuccess: true,
          adminId: admin._id,
        });
      });
    });
  });
});

router.get('/logout', authadmin, (req, res) => {
  Admin.findOneAndUpdate(
    { _id: req.admin._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
