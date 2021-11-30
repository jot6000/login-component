import {useState, useEffect} from 'react'

import { useNavigate, Link } from "react-router-dom";

//import users from './testData.json'

export default function LoginBox(props){

    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [checkbox,setcheckbox] = useState(false)
    const [valid,setvalid] = useState(false)
    const [incorrect,setincorrect] = useState(false)

    let navigate = useNavigate();

    function updateEmail(event){
        setemail(event.target.value)
    }

    function updatePassword(event){
        setpassword(event.target.value)
    }

    function updateCheckbox(){
        setcheckbox(!checkbox)
    }

    useEffect(() => {
        if(email === '' || password === ''){
            setvalid(false)
        }
        else{
            setvalid(true)
        }
    });

    function checkUserExists(event){


        //Abstract this to the server
        fetch('http://127.0.0.1:8000/accounts')
            .then(response=> response.json())
            .then(data=>{
                data.map((user)=>{
                    if(user.email.toLowerCase() === email.toLowerCase() && user.password === password){
                        navigate('/Home')
                       
                        setincorrect(false)
                    }
                })
            })

        setincorrect(true)

        event.preventDefault()
        
        setemail("")
        setpassword("")
    }

    return(
        <div className='login-box'>
            <header>Login</header>
            <form onSubmit={(event)=>checkUserExists(event)}>
                <input 
                    type='email'
                    value={email}
                    placeholder='Email'
                    onChange={(event)=>updateEmail(event)}
                />
                <input
                    className='password' 
                    type={checkbox?'text':'password'} 
                    value={password}
                    placeholder='Password'
                    onChange={(event)=>updatePassword(event)}
                />
                {incorrect? 
                    <div>
                        There was an issue with either your email address or password!
                    </div>
                        :
                    <></>
                }
                <div>
                    <input 
                        type='checkbox' 
                        checked={checkbox} 
                        onClick={updateCheckbox}
                    />
                    <div>Show Password</div>
                </div>
                <input 
                    className={valid?'login-submit':'login-submit-disabled'}
                    type='submit'
                    value='Login'
                    disabled={!valid}
                />
            </form>
            <p>Not got an account <Link to="/Authorise/CreateAccount">Click Here</Link> to create one</p>
        </div>
    );
}