var URL = 'http://localhost:3000/posts'
var listpostGlobal;
/*http method 
GET posts(all), posts/1 (lay 1 phan tu)
PUT posts/1
POST posts
DELETE posts/1
*/
function Save() {// neu truong ID co id khong ton tai => tao id bang gia tri trong truong id
    //neu truong ID co id ton tai -> edit
    var id = parseInt(document.getElementById("id").value);
    if (isNaN(id))//neu khong dien ID thi gan ID moi bang ID to nhat trong db + 1
    {
        var newPost = {
            id: getMaxID() + 1,
            userId: document.getElementById("title").value,
            title: document.getElementById("title").value,
            completed: document.getElementById("title").value,
        }
        Create(newPost);
    } else {
        var getPost = getPostByID(id);
        if (!getPost) {// co dien nhung id khong ton tai -> tao moi bang ID trong truong Id
            var newPost = {
                id: parseInt(document.getElementById("id").value),
                userId: document.getElementById("title").value,
                title: document.getElementById("title").value,
                completed: document.getElementById("title").value,
            }
            Create(newPost);
        } else {//-edit
            var editPost = {
                userId: document.getElementById("title").value,
                title: document.getElementById("title").value,
                completed: document.getElementById("title").value,
            }
            Edit(id, editPost);
        }
    }
}

function Edit(id, data) {
    fetch(URL + "/" + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(Load)
}
function Create(data) {
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(Load)
}

function getPostByID(id) {
    for (const post of listpostGlobal) {
        if (post.id == id) {
            return true;
        }
    }
    return false;
}
function getMaxID() {
    var ids = listpostGlobal.map((element) => {
        return element.id;
    })
    return Math.max(...ids);
}

function Load() {
    fetch(URL).then(//GET
        function (response) {
            return response.json()
        }
    )
        .then(function (posts) {
            posts.sort(compareFn)
            listpostGlobal = posts;
            var tbody = document.getElementById('tbody');
            tbody.innerHTML = "";
            var tbody = document.getElementById('tbody');
            for (const post of posts) {
                tbody.innerHTML += ConvertFromDataPostToRow(post);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}
function deleteItem(id) {
    fetch(URL + "/" + id, {
        method: 'DELETE'
    }).then(Load)
}

function ConvertFromDataPostToRow(post) {
    var result = "<tr>"
    result += '<td>' + post.id + '</td>';
    result += '<td>' + post.userId + '</td>';
    result += '<td>' + post.title + '</td>';
    result += '<td>' + post.completed + '</td>';
    result += '<td><button onclick="deleteItem(' + post.id + ')">Delete</button></td>';
    result += "</tr>";
    return result;
}
function compareFn(a, b) {//post
    if (a.id > b.id) {
        return 1;
    } else {
        return -1;
    }
}

