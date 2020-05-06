const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { authadmin } = require('../middleware/authadmin');
const path = require('path');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, '../../uploads/');
    cb(null, path.resolve(__dirname, '../../uploads/'));
    // console.log(path.resolve(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

router.post('/uploadImage', authadmin, (req, res) => {
  //after getting image from client
  //need to save it on server
  //multer library

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(res.req.file);
    return res.json({
      success: true,
      // image: res.req.file.path,
      image: `uploads/${res.req.file.filename}`,

      filename: res.req.file.filename,
    });
  });
});

router.post('/uploadBlog', authadmin, (req, res) => {
  //save all the data we got from the client into the DB
  const blog = new Blog(req.body);

  blog.save((err) => {
    if (err) returnres.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/getBlogs', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);

  if (term) {
    Blog.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, blogs) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, blogs, postSize: blogs.length });
      });
  } else {
    Blog.find(findArgs)
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, blogs) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, blogs, postSize: blogs.length });
      });
  }
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get('/blogs_by_id', (req, res) => {
  let type = req.query.type;
  let blogIds = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    blogIds = [];
    blogIds = ids.map((item) => {
      return item;
    });
  }

  //we need to find the product information that belong to product Id
  Blog.find({ _id: { $in: blogIds } })
    .populate('writer')
    .exec((err, blog) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(blog);
    });
});

module.exports = router;
