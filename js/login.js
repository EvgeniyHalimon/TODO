const loginForm = document.querySelector(".login-form")
const loginEmail = document.querySelector("#login-email")
const loginPassword = document.querySelector("#login-password")

let loginArr = []

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const getData = localStorage.getItem("user-data")
    const parseData = JSON.parse(getData)
    if(parseData){
        loginArr = parseData
    }
    const findUser = loginArr.find((item) =>{
        return item.email === loginEmail.value && item.password === loginPassword.value
    })
    if(findUser){
        localStorage.setItem("account", JSON.stringify(findUser))
        document.location.href="../html/to-do.html"
    } else{
        return
    }
})

