import { useState,useEffect } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom"
 
export default function CreateAccount(props){
 
    const [firstname,setfirstname] = useState('')
    const [lastname,setlastname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [confirmpassword,setconfirmpassword] = useState('')
    const [checkbox,setcheckbox] = useState(false)
    const [valid,setvalid] = useState(false)
    const navigate = useNavigate()
 
    let passwordsame = false
 
    function updateFirstname(event){
        setfirstname(event.target.value)
    }
 
    function updateLastname(event){
        setlastname(event.target.value)
    }
 
    function updateEmail(event){
        setemail(event.target.value)
    }
   
    function updatePassword(event){
        setpassword(event.target.value)
    }
   
    function updateConfirmpassword(event){
        setconfirmpassword(event.target.value)
    }
   
    function updateCheckbox(event){
        setcheckbox(!checkbox)
    }
 
    function checkPasswordsSame(event){

        const data = {
            email: email,
            password: password,
            id: 0,
            subscribed: false,
            firstName: firstname,
            surname: lastname
        }
        
        if(passwordValidation(password)[0] === undefined){
            if(password === confirmpassword){
                passwordsame = true
                
                fetch('http://127.0.0.1:8000/accounts',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                    },
                    body:JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data=>console.log("Success:",data))
                .catch((error)=>{console.error('Error:',error)})
    
                alert("Account Created")
                navigate("/Home")
            }
            else{
                passwordsame = false
                alert("Passwords must match")
            }
        }
        else{
            passwordValidation(password).map((error)=>alert(error))
        }
    }
 
    function checkUserExists(event){
        
        event.preventDefault()

        let existinguser = false
        //Move this to server also
        fetch('http://127.0.0.1:8000/accounts')
            .then(response=> response.json())
            .then(data=>{
                data.map((user)=>{
                    if(email===user.email){
                        existinguser=true
                    }
                });
                if(existinguser===true){
                    alert("Email has already been registered")
                }
                else{
                       
                    checkPasswordsSame(event)
                    if(passwordsame===false){
                        setpassword('')
                        setconfirmpassword('')
                    }
                }
            })  
    }
   
    useEffect(()=>{
        if(firstname==='' || lastname==='' || email==='' || password==='' || confirmpassword===''){
            setvalid(false)
        }
        else{
            setvalid(true)
        }
    })

    function passwordValidation(password){
        const lengthRule = /.{8,}/
        const numberSymbolRule = /[\W]|[0-9]/
        const capitalRule = /[A-Z]/
        
        let errors = []

        if(!password.match(lengthRule)){
            errors.push("Password is not longer than 8 characters")
        }
        if(!password.match(numberSymbolRule)){
            errors.push("Password does not contain a number or symbol")
        }
        if(!password.match(capitalRule)){
            errors.push("Password does not contain a capital letter")
        }
        return errors
    }
 
    return(
        <div className="main-box">
            <h1 className="title">Create your account</h1>
                <form className="form-box" onSubmit={(event)=>checkUserExists(event)}>
                    <div className="names-div">
                        <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(event)=>updateFirstname(event)}
                        />
 
                        <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(event)=>updateLastname(event)}
                        />
                    </div>
                    <div className="email-div">
                        <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(event)=>updateEmail(event)}
                        />
                    </div>
                    <div className="password-div">
                        <input
                        type={!checkbox? "password":"text"}
                        placeholder="Password"
                        value={password}
                        onChange={(event=>updatePassword(event))}
                        />  
                        <input  
                        type={!checkbox? "password":"text"}
                        placeholder="Confirm password"
                        value={confirmpassword}
                        onChange={(event)=>updateConfirmpassword(event)}
                        />
                    </div>
                    <div className="show-password-div">
                        <input
                        type="checkbox"
                        value="Show password"
                        checked={checkbox}
                        onClick={updateCheckbox}
                        />
                        <label>Show Password</label>
                    </div>
                    <div className="button-div">
                        <input
                        className={valid? "submit-button":"submit-button-disabled"}
                        type="submit"
                        value="Submit"
                        disabled={!valid}
                        />
                    </div>
                    <div> Already have an account? Click <Link to="/Authorise/Login">Here</Link> to log in</div>
                </form>
        </div>
    )
}
