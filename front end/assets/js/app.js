const cl = console.log;

const postscontainer = document.getElementById("postscontainer");
const titleControl = document.getElementById("title");
const ContentControl = document.getElementById("Content");
const postform = document.getElementById("postform");
const userIdControl = document.getElementById("userId");
const submitbtn = document.getElementById("submitbtn");
const updatebtn = document.getElementById("updatebtn");
const loader = document.getElementById("loader");

const BASE_URL = `http://localhost:3000/api/v1/posts`;

// const POST_URL = `${BASE_URL}/posts.json`; //this url will be used for GET and POST method

// let postsArr = [];



const sweetalert = (msg, iconstr)=>{
    swal.fire({
        title:msg,
        timer:2000,
        icon:iconstr
    })  
}

const generateUuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
      /[xy]/g,
      (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
  
        return value.toString(16);
      }
    );
  };

const templatingofCards = (arr) =>{
    postscontainer.innerHTML = arr.map(post=> {

        return `
                <div class="col-md-4 mb-3">
                <div class="card postcard h-100" id="${post.id}">
                    <div class="card-header">
                        <h3 class="m-0">${post.title}</h3>
                    </div>
                    <div class="card-body">
                        <p class="m-0">${post.content}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn btninfo" onclick = "onEdit(this)">Edit</button>
                    <button class="btn btn btnrem" onclick = "onRemove(this)">Remove</button>
                    </div>
                </div>
            </div>`
                
        
    }).join("");
}

const makeApiCall = async (methodName, api_url, msgBody)=>{
    loader.classList.remove(`d-none`)
    try{
        
        msgBody = msgBody ? JSON.stringify(msgBody) : null;
      
        let res = await fetch(api_url,{
        method:methodName,
        body:msgBody,
        headers:{
            "content-type" : "application/json",
            "Authorization": "Bearer your token from localstorage"
        }
        })
        
          return res.json()
    }
    catch(err){
    cl(err)
    }
    finally{
        postform.reset()
        loader.classList.add(`d-none`)
    }
         
  }

const fetchposts = async() =>{
    
        let postobj = await makeApiCall("GET" , BASE_URL) 
    
        //we will cb here
        let postArr = [];
        for(const key in postobj){
            //let obj = {...res[key], id:key}
            // obj.id = key;
            postArr.push(postobj[key])
            // cl(postArr)
        }
        templatingofCards(postArr)
        loader.classList.add(`d-none`);
    };
    fetchposts()
 

const onAddpost = async (eve)=>{
    eve.preventDefault();
    let newpost = {
        title:titleControl.value,
        content:ContentControl.value,
        userId:userIdControl.value,
        id:generateUuid()
    }
    try{
       let res = await makeApiCall("POST" , BASE_URL, newpost) 

        //we will cb here and create a card
        newpost.id = res.name;
        let card = document.createElement(`div`);
        card.classList = `col-md-4 mb-3`
        // card.id = newpost.id;
        card.innerHTML = `<div class="card postcard h-100" id="${newpost.id}">
                        <div class="card-header">
                            <h3 class="m-0">${newpost.title}</h3>
                        </div>
                        <div class="card-body">
                            <p class="m-0">${newpost.content}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn btninfo" onclick = "onEdit(this)">Edit</button>
                        <button class="btn btn btnrem" onclick = "onRemove(this)">Remove</button>
                        </div>
                    </div>`
                    postscontainer.prepend(card);
                    sweetalert(`${newpost.title} is added successfully`, "success")
                    
    }
catch(err) {
    cl(err)
}
finally{
    postform.reset()
    loader.classList.add(`d-none`)
}

}

const onEdit = async (ele) =>{
    try{
    //editid
        let editId = ele.closest(`.card`).id;
    // cl(editId)

    localStorage.setItem("editId", editId);

    //Edit URL
    let EDIT_URL = `${BASE_URL}/${editId}`

    //API call
   let res = await makeApiCall("GET", EDIT_URL)
  //we will get a single object, to patch the obj in form
        titleControl.value = res.title;
        ContentControl.value = res.content;
        userIdControl.value = res.userId
        
        window.scrollTo(0,0,"smooth")
    } 
    
    catch(err) {
        cl(err)
    }
    finally{
        
        loader.classList.add(`d-none`)
        updatebtn.classList.remove(`d-none`);
        submitbtn.classList.add(`d-none`)
    }
}

const onupdatepost = async () => {
    try{
    //update Id
    let updateId = localStorage.getItem("editId");
    cl(updateId)

    //updated URL

    let UPDATE_URL = `${BASE_URL}/${updateId}`

    //Updated obj

    let updatedobj = {
        title:titleControl.value,
        content:ContentControl.value.trim(),
        userId:userIdControl.value
        
    }
    

    //API call
    let res = await makeApiCall("PATCH", UPDATE_URL, updatedobj)
     //if is is success
    //callback functionality - to update in UI
    let card = [...document.getElementById(updateId).children]
    // cl(card)
    card[0].innerHTML = `<h3 class="m-0">${updatedobj.title}</h3>`
    card[1].innerHTML = ` <p class="m-0">${updatedobj.content}</p>`
    sweetalert(`${updatedobj.title} is updated successfully`, "success")
    }
    
    
    catch(err){
        cl(err)
    }
    finally{
        postform.reset()
        updatebtn.classList.add(`d-none`);
        submitbtn.classList.remove(`d-none`)
        loader.classList.add(`d-none`)
    }


}

const onRemove = async (ele) =>{

    try {
        let getconfirm = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this card!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#FF2400",
          cancelButtonColor: "#7393B3",
          confirmButtonText: "Yes, remove it!",
        });
        if (getconfirm.isConfirmed) {
          //Remove ID
          let RemoveId = ele.closest(`.card`).id;
          // cl(RemoveId)
          //Remove URL
    

    let REMOVE_URL = `${BASE_URL}/${RemoveId}`


    //API call

    let res = await makeApiCall("DELETE", REMOVE_URL);
    ele.closest(`.card`).parentElement.remove();
  }
} catch (err) {
  sweetalert(err, "error");
} finally {
  loader.classList.add(`d-none`);
}
};
    

    




postform.addEventListener("submit", onAddpost)
updatebtn.addEventListener("click", onupdatepost)


