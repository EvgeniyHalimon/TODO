const loginForm = document.querySelector(".login-form")
const loginEmail = document.querySelector("#login-email")
const loginPassword = document.querySelector("#login-password")

let loginArr = []

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    getUser()
    const findUser = loginArr.find((item) =>{
        return item.email === loginEmail.value
    })
    if(!findUser){
        alert("This user doesnt exist or wrong email")
        return
    }
    if(findUser.password !== loginPassword.value){
        alert("Wrong password")
    }
    localStorage.setItem("account", JSON.stringify(findUser))
    document.location.href="../html/to-do.html" 
})

function getUser() {
    const getData = localStorage.getItem("user-data")
    const parseData = JSON.parse(getData)
    if(parseData){
        loginArr = parseData
    }
}