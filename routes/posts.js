const express = require(`express`);

const router = express.Router();

// const getAllposts = require(`../controllers/posts`)
// const getpostById = require(`../controllers/posts`)
// const createPost = require(`../controllers/posts`)
// const updatePost = require(`../controllers/posts`)
// const deletePost = require(`../controllers/posts`)

const {getAllposts,getpostById,createPost,updatePost,deletePost} = require(`../controllers/posts`)

router.get(`/api/v1/posts`, getAllposts);

router.get(`/api/v1/posts/:id`, getpostById);

router.post(`/api/v1/posts`,createPost);

router.patch(`/api/v1/posts/:id`, updatePost);

router.delete(`/api/v1/posts/:id`,deletePost);


module.exports = router;