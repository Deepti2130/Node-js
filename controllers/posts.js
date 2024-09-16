const posts = [
    {
      title:"Node js",
      content:"Node.js is a JavaScript runtime environment that is used for building web applications and network programs",
      userid:1,
      id:123
    },
    {
      title:"Express js",
      content:"Node.js is a JavaScript runtime environment that is used for building web applications and network programs",
      userid:2,
      id:124
    }
  
  ]

  
  exports.getAllposts = (req,res)=>{
    res.status(200).json(posts)
  }

  exports.getpostById = (req, res) =>{
    //I have to get the params ID and then find the object
  debugger;
    let postId = req.params.id
  
    let object = posts.find(post => post.id === +postId)
  
    res.status(200).json(object)
  }


  exports.createPost = (req, res) =>{
    let newpost = req.body;
  
    posts.push(newpost);
  
    res.status(200).json({
      message:"New post created successfully!!!",
      post:newpost,
      
    })
  }

  exports.updatePost = (req, res) =>{
    let updateId = req.params.id;
  
    let updatedobj = req.body;
  
    let getIndex = posts.findIndex(post => post.id === +updateId);
  
    posts[getIndex] = updatedobj;
  
    res.status(201).json({
      message:`post with id ${updateId} is updated successfully`,
      post:updatedobj
    })
  }


  exports.deletePost = (req, res) =>{
    let removeId = req.params.id;
   
    let getIndex = posts.findIndex(post => post.id === +removeId);
   
    posts.splice(getIndex, 1);
   
    res.status(200).json({
     message:`The post with is ${removeId} is removed successfully`,
     post:removeId
    })
   }