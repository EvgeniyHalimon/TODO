//! это был основной скрипт,его я хотел улучшить с помощью переиспользования основной скрипт => old.js

const inputText = document.querySelector(".input_txt")
const inputColor = document.querySelector(".input_color")
const createTagBtn = document.querySelector(".create-tag_btn")
const clearBtn = document.querySelector(".clear_btn")

createTagBtn.addEventListener("click", createTag)
clearBtn.addEventListener("click", clearSaves)

function clearSaves() {
    localStorage.clear()
    window.location.reload()
}

const select = document.querySelector("select")
const alertTag = document.querySelector(".alert_tag")

let tagArr = [{
        tag: "Выбери тег",
        color: "#ffffff"
    }]
    
function getDataFromStorage(string, arr, func) {
    const getData = localStorage.getItem(string)
    const parseData = JSON.parse(getData)
    if(parseData){
        arr = parseData
        func
    }
}

let data = "data"


function createTag() {
    const tagName = inputText.value
    const tagColor = inputColor.value
    const findTag = tagArr.find((item) => {
        return item.tag === tagName || item.color === tagColor
    })
    if(!findTag){
        tagArr.push({
            tag: tagName,
            color: tagColor
        })
    } else{
        alert("This tag or color has already exist!")
    }
    printItems()
}

function printItems(){
    select.innerHTML = ""
    for (let i = 0; i < tagArr.length; i++){
        const option = document.createElement("option")
        select.appendChild(option)
        let {tag, color } = tagArr[i]
        option.innerText = `${tag}`
        option.style.background = `${color}`
    }
    localStorage.setItem(data, JSON.stringify(tagArr))
}

getDataFromStorage(data, tagArr, printItems)

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

const spanTxt = document.querySelector(".alert_task")

let taskArr = []
let task = "task"


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
            id: Date.now()
        })
    }
    printTask()
}

function printTask() {
    taskList.innerHTML = ""
    for(let i = 0; i < taskArr.length; i++){
        const taskElem = document.createElement("li")
        let {task, tag, color, id} = taskArr[i]
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
        spanTxt.innerHTML = `${task} `
        spanTag.innerHTML = `${tag}`
        chk.value = `${task}`
    }
    if(taskArr.length > 0){
        searchBlock.style.display = "flex"
    } else{
        searchBlock.style.display = "none"
    }
    localStorage.setItem(task, JSON.stringify(taskArr))
}

getDataFromStorage(task, taskArr, printTask)

let archiveArr = []
let archive = "archive"
const archiveList = document.querySelector(".archive_list")


function setToArchive(){
    const findTask = taskArr.find((item) =>{
        return item.id === Number(this.id)
    })
    archiveArr.push({
        task: findTask.task,
        tag: findTask.tag,
        color: findTask.color,
        id: findTask.id
    })
    const find = taskArr.filter((item) => {
        return item.id !== Number(this.id)
    })
    taskArr = find
    printTask()
    printArchive()
}

function printArchive() {
    archiveList.innerHTML = ""
    for (let i = 0; i < archiveArr.length; i++) {
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
        let {task, tag, color, id} = archiveArr[i]
        chkArchive.id = `${id}`
        archiveTask.innerHTML = `${task} `
        archiveTask.style.textDecoration = "line-through"
        archiveTag.innerHTML = `${tag}`
        archiveTag.style.background = `${color}`
    }
    localStorage.setItem(archive, JSON.stringify(archiveArr))
}

getDataFromStorage(archive, archiveArr, printArchive)

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

