const inputText = document.querySelector(".input_txt")
const inputColor = document.querySelector(".input_color")
const createTagBtn = document.querySelector(".create-tag_btn")
const clearBtn = document.querySelector(".clear_btn")

createTagBtn.addEventListener("click", createTag)
clearBtn.addEventListener("click", clearSaves)

function clearSaves() {
    let getTag = localStorage.getItem("tag")
    let getTask = localStorage.getItem("task")
    let getArchive = localStorage.getItem("archive")
    let parseTag = JSON.parse(getTag)
    let parseTask = JSON.parse(getTask)
    let parseArchive = JSON.parse(getArchive)
    let filterTag = parseTag.filter(item => item.email !== account.email)
    let filterTask = parseTask.filter(item => item.email !== account.email)
    let filterArchive = parseArchive.filter(item => item.email !== account.email)
    localStorage.setItem("tag", JSON.stringify(filterTag))
    localStorage.setItem("task", JSON.stringify(filterTask))
    localStorage.setItem("archive", JSON.stringify(filterArchive))
    window.location.reload()
}

const logout = document.querySelector(".logout")
logout.addEventListener("submit", (e) => {
    e.preventDefault()
    document.location.href="../html/login-page.html"
    localStorage.removeItem("account")
})

const welcomeText = document.querySelector(".welcome")

let account = []
getDataFromStorage()
function getDataFromStorage() {
    const getData = localStorage.getItem("account")
    const parseData = JSON.parse(getData)
    if(parseData){
        account = parseData
    }
}

welcomeText.innerText = `${account.name} : online`

const select = document.querySelector("select")
const alertTag = document.querySelector(".alert_tag")

let tagArr = [{
        tag: "Выбери тег",
        color: "#ffffff"
    }]  

getTagsFromStorage()

function createTag() {
    const tagName = inputText.value
    const tagColor = inputColor.value
    const findTag = tagArr.find((item) => {
        return item.tag === tagName || item.color === tagColor
    })
    if(!findTag){
        tagArr.push({
            tag: tagName,
            color: tagColor,
            email: account.email
        })
    } else{
        alert("This tag or color has already exist!")
    }
    printItems()
}

function printItems(){
    const filterTag = tagArr.filter((item) => {
        return item.email === account.email
    })
    select.innerHTML = ""
    for (let i = 0; i < filterTag.length; i++){
        const option = document.createElement("option")
        select.appendChild(option)
        let {tag, color } = filterTag[i]
        option.innerText = `${tag}`
        option.style.background = `${color}`
    }
    localStorage.setItem("tag", JSON.stringify(tagArr))
}

function getTagsFromStorage() {
    let getData = localStorage.getItem("tag")
    let parseData = JSON.parse(getData)
    if(parseData){
        tagArr = parseData
        printItems()
    }
}

const searchBlock = document.querySelector(".search_block")
const inputTask = document.querySelector(".task_txt")
const createTaskBtn = document.querySelector(".create-task_btn")
createTaskBtn.addEventListener("click", createTask)
const taskList = document.querySelector(".task_list")

const searchTxt = document.createElement("p")
searchBlock.prepend(searchTxt)
searchTxt.innerText = "Search"
searchTxt.style.marginRight = "10px"
const searchInput = document.createElement("input")
searchBlock.appendChild(searchInput)
searchInput.type = "search"
searchInput.style.marginRight = "10px"

const searchTag = document.createElement("input")
searchBlock.appendChild(searchTag)
searchTag.type = "search"
const searchByTag = document.createElement("p")
searchBlock.append(searchByTag)
searchByTag.innerText = "Search by tag"
searchByTag.style.marginLeft = "10px"

const spanTxt = document.querySelector(".alert_task")

let taskArr = []
getTaskFromStorage()

function createTask() {
    const taskName = inputTask.value
    alertTag.innerText = ""
    spanTxt.innerText = ""
    if(taskName.length === 0 || select.value === "Выбери тег"){
        if(taskName.length === 0){
            spanTxt.innerHTML = "Insert task"
        }
        if(select.value === "Выбери тег"){
            alertTag.innerHTML = "Choose tag"
        }
        return 
    }
    const findTask = tagArr.find((item) => {
        return item.tag == select.value
    })
    if(findTask){
        taskArr.push({
            task: taskName,
            tag: findTask.tag,
            color: findTask.color,
            id: Date.now(),
            email: account.email
        })
    }
    printTask()
}

function printTask() {
    const filterTask = taskArr.filter((item) => {
        return item.email === account.email
    })
    taskList.innerHTML = ""
    for(let i = 0; i < filterTask.length; i++){
        const taskElem = document.createElement("li")
        let {task, tag, color, id} = filterTask[i]
        const chk = document.createElement("input")
        chk.type = "checkbox"
        chk.checked = false
        chk.id = `${id}`
        chk.addEventListener("click", setToArchive)
        const spanTxt = document.createElement("span")
        const spanTag = document.createElement("span")
        spanTag.style.background = `${color}`
        taskList.appendChild(taskElem)
        taskElem.prepend(chk)
        taskElem.append(spanTxt)
        taskElem.append(spanTag)
        taskElem.id = `${tag}`
        spanTxt.innerHTML = `${task} `
        spanTag.innerHTML = `${tag}`
        chk.value = `${task}`
    }
    if(filterTask.length > 0){
        searchBlock.style.display = "flex"
    } else{
        searchBlock.style.display = "none"
    }
    localStorage.setItem("task", JSON.stringify(taskArr))
}

function getTaskFromStorage() {
    let getTask = localStorage.getItem("task")
    let parseTask = JSON.parse(getTask)
    if(parseTask){
        taskArr = parseTask
        printTask()
    }
}

let archiveArr = []
const archiveList = document.querySelector(".archive_list")
getTaskFromArchive()

function setToArchive(){
    const findTask = taskArr.find((item) =>{
        return item.id === Number(this.id)
    })
    archiveArr.push({
        task: findTask.task,
        tag: findTask.tag,
        color: findTask.color,
        id: findTask.id,
        email: account.email
    })
    const find = taskArr.filter((item) => {
        return item.id !== Number(this.id)
    })
    taskArr = find
    printTask()
    printArchive()
}

function printArchive() {
    const archiveFilter = archiveArr.filter((item) => {
        return item.email === account.email
    })
    archiveList.innerHTML = ""
    for (let i = 0; i < archiveFilter.length; i++) {
        const archiveElem = document.createElement("li")
        const chkArchive = document.createElement("input")
        chkArchive.type = "checkbox"
        chkArchive.checked = "true"
        chkArchive.addEventListener("click", removeToList)
        const archiveTask = document.createElement("span")
        const archiveTag = document.createElement("span")
        archiveList.appendChild(archiveElem)
        archiveElem.prepend(chkArchive)
        archiveElem.append(archiveTask)
        archiveElem.append(archiveTag)
        let {task, tag, color, id} = archiveFilter[i]
        chkArchive.id = `${id}`
        archiveTask.innerHTML = `${task} `
        archiveTask.style.textDecoration = "line-through"
        archiveTag.innerHTML = `${tag}`
        archiveTag.style.background = `${color}`
    }
    localStorage.setItem("archive", JSON.stringify(archiveArr))
}

function getTaskFromArchive() {
    let getArchiveTask = localStorage.getItem("archive")
    let parseArchiveTask = JSON.parse(getArchiveTask)
    if(parseArchiveTask){
        archiveArr = parseArchiveTask
        printArchive()
    }
}

function removeToList() {
    const findArchive = archiveArr.find((item) =>{

        return item.id === Number(this.id)
    })
    taskArr.push({
        task: findArchive.task,
        tag: findArchive.tag,
        color: findArchive.color,
        id: findArchive.id
    })
    const filterArchive = archiveArr.filter((item) => {
        return item.id !== Number(this.id)
    })
    archiveArr = filterArchive
    printTask()
    printArchive()
}

const radioGroup = document.querySelector(".radio_group")
radioGroup.addEventListener("click", getButtonState)

getBtnState()
function getButtonState(event) {
    if(event.target.value === "off"){
        archiveList.classList.add("hide")
        localStorage.setItem("state-of-button", "off")
    } else{
        archiveList.classList.remove("hide")
        localStorage.setItem("state-of-button", "on")
    }
}

function getBtnState() {
    const radioButtons = document.querySelectorAll(".radio")
    const state = localStorage.getItem("state-of-button")
    for(let elem of radioButtons){
        if(elem.value === state){
            elem.checked = true
        } else {
            elem.checked = false
        }
    }
    state === "off" ? archiveList.classList.add("hide") : archiveList.classList.remove("hide")
}

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim()
    const taskItems = document.querySelectorAll(".task_list li")
    if(searchValue !== ""){
        taskItems.forEach((item) =>{
            if(item.innerText.search(searchValue) == -1){
                item.classList.add("hide")
                
            } else {
                item.classList.remove("hide")
            }
        })
    } else {
        taskItems.forEach((item) => {
            item.classList.remove("hide")
            
        })
    }
})

searchTag.addEventListener("input", () => {
    const searchValue = searchTag.value.trim()
    const taskItems = document.querySelectorAll(".task_list li")
    if(searchValue !== ""){
        taskItems.forEach((item) =>{
            if(item.id.search(searchValue) == -1){
                item.classList.add("hide")
                
            } else {
                item.classList.remove("hide")
            }
        })
    } else {
        taskItems.forEach((item) => {
            item.classList.remove("hide")
        })
    }
})