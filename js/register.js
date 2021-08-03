const formList = document.querySelector(".form-list")
const firstName = document.querySelector("#first_name")
const lastName = document.querySelector("#last_name")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const passwordRepeat = document.querySelector("#repeat_password")
const warningTxt = document.querySelector(".warning_txt")


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
    }
    if(password.value !== passwordRepeat.value){
        warningTxt.innerHTML = "Password mismatch"
        return false
    } else if(password.value === passwordRepeat.value){
        document.location.href="../html/login-page.html"
    }
    localStorage.setItem("user-data", JSON.stringify(userArr))     
})

function getDataFromStorage() {
    const getData = localStorage.getItem("user-data")
    const parseData = JSON.parse(getData)
    if(parseData){
        userArr = parseData
    }
}

password.addEventListener("focus", () => {
    warningTxt.innerHTML = ""
})