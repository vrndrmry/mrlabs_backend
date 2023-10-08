const userData = [
    {id:1,
    username:"xyz@gmail.com",
    password:"123"},
    {id:2,
        username:"abc@gmail.com",
        password:"1234"},
    {id:3,
            username:"mno@gmail.com",
            password:"12345"},
]

const getUserData = () =>{
    return new Promise((resolve)=>{
        resolve(userData)
    })}

module.exports = userData