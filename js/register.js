const formList = document.querySelector(".form-list")
const firstName = document.querySelector("#first_name")
const lastName = document.querySelector("#last_name")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const passwordRepeat = document.querySelector("#repeat_password")

let userArr = []

formList.addEventListener("submit", (e) => {
    e.preventDefault()
    getDataFromStorage()
    const findUser = userArr.find((item) => {
        return item.email === email.value
    })
    if(!findUser){
        userArr.push({
            name: firstName.value,
            surname: lastName.value,
            email: email.value,
            password: password.value,
        })
    } else{
        alert("This email has already exist")
        return
    } 
    if(password.value !== passwordRepeat.value){
        alert("Password mismatch")
        return
    }
    localStorage.setItem("user-data", JSON.stringify(userArr))  
    document.location.href="../html/login-page.html"
})

function getDataFromStorage() {
    const getData = localStorage.getItem("user-data")
    const parseData = JSON.parse(getData)
    if(parseData){
        userArr = parseData
    }
}
