
// var nameInput=document.getElementById("name");
// var urlInput=document.getElementById("URL");
// var button=document.getElementById("button");

// var bookmarks=[]

// button.onclick=function(){
// var bookmark={
// name:nameInput.value,
// url:urlInput.value,

// }
 
// bookmarks.push(bookmark);

// console.log(bookmarks);
// localStorage.setItem("bookmarks" ,JSON.stringify(bookmark), bookmarks);
// }


var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var submitBtn = document.getElementById("submitBtn")
var updateBtn = document.getElementById("updateBtn")
var searchInput = document.getElementById("searchInput")
var modal = document.getElementById("exampleModal")
var closeBtn = document.getElementById("closeBtn")
var sitesArray = [];
var updatedIndex;


if (localStorage.getItem("Websites") != null) {
    sitesArray = JSON.parse(localStorage.getItem("Websites"))
    displayWebsite(sitesArray)
}



submitBtn.addEventListener("click", addWebsite)
function addWebsite() {
    if (validateInputs() == true) {
        website = {
            name: siteName.value,
            url: siteUrl.value
        }
        sitesArray.push(website)
        localStorage.setItem("Websites", JSON.stringify(sitesArray))
        clearInputs()
        console.log(sitesArray);
        displayWebsite(sitesArray)
    } else {
        openModal()
    }
}

function clearInputs() {
    siteName.value = null;
    siteUrl.value = null;
}

function displayWebsite(array) {
    var sitesBox = ""
    for (i = 0; i < array.length; i++) {
        var originalIndex = sitesArray.indexOf(array[i])
        sitesBox += `
        <tr>
        <th>${i + 1}</th>
        <th>${array[i].name}</th>
        <th><button onclick="visitWebsite('${array[i].url}')" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></th>
        <th><button onclick="getWebsiteToUpdate(${originalIndex})" class="btn btn-warning"><i class="fa-solid fa-eye"></i> Update</button></th>
        <th><button onclick="deleteWebsite(${originalIndex})" class="btn btn-danger"><i class="fa-solid fa-eye"></i> Delete</button></th>
        </tr>
        `
    }
    document.getElementById("t-body").innerHTML = sitesBox;
}


searchInput.addEventListener("input", searchWebsite)
function searchWebsite() {
    var term = searchInput.value
    var searchArray = [];
    for (i = 0; i < sitesArray.length; i++) {
        if (sitesArray[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchArray.push(sitesArray[i])
        }
    }
    displayWebsite(searchArray)
}

function deleteWebsite(index) {
    sitesArray.splice(index, 1)
    localStorage.setItem("Websites", JSON.stringify(sitesArray))
    displayWebsite(sitesArray)
}

function visitWebsite(url) {
    window.open(url)
}

function getWebsiteToUpdate(index) {
    siteName.value = sitesArray[index].name
    siteUrl.value = sitesArray[index].url
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    updatedIndex = index
}


updateBtn.addEventListener("click", updateWebsite)
function updateWebsite() {
    sitesArray[updatedIndex].name = siteName.value
    sitesArray[updatedIndex].url = siteUrl.value
    clearInputs()
    displayWebsite(sitesArray)
    localStorage.setItem("Websites", JSON.stringify(sitesArray))
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
}

function validateInputs() {
    var siteNameRegex = /^[0-9]*[a-zA-Z]{3,}[0-9]*$/;
    var siteUrlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/

    if (siteNameRegex.test(siteName.value) == false) {
        return false
    } else if (siteUrlRegex.test(siteUrl.value) == false) {
        return false
    }
    return true
}



closeBtn.addEventListener("click", closeModal)

function closeModal() {
    modal.classList.add("d-none")
}

function openModal() {
    modal.classList.remove("d-none")
}


