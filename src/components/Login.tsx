import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';
// import { gql } from 'graphql';

const FETCH_LOGIN_DETAILS =  gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(
    loginInput:{
        email: $email, password: $password
    }
    ){
    userId
    token
  }
}
`;
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { loading }] = useMutation(FETCH_LOGIN_DETAILS, {
        update(
          _,result
        ) {
            console.log(result)
            localStorage.setItem('access-token', result.data.loginUser.token);
            navigate('/feed');
        },
        onError(err) {
          console.log(err);
        },
        variables: {
            email: email,
            password: password
        }
    });

    useEffect(()=>{

    },[]);

    const redirectToRegister = () => {
        navigate('/register');
    }

    const handleChange = (e : any) => {
        let name = e.target.name;
        if(name === 'email') {
            setEmail(e.target.value);
        }else if(name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = () => {
        console.log(email, password);
        loginUser();
    }

    return (
        <div className="section is-fullheight">
            <div className="container">
                <div className="column is-6 is-offset-3">
                    <div className="box">
                        <h1>Login</h1>
                        <div className="field">
                            <label className="label">Email Address</label>
                            <div className="control">
                            <input
                                autoComplete="off"
                                className={`input`}
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={email || ""}
                                required
                            />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                className={`input`}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={password || ""}
                                required
                                />
                            </div>
                        </div>
                        <button
                            className="button is-block is-info is-fullwidth"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                        <div className='create-acc'>
                            <span className='text-message'>Create new Account ?</span><span className="register" onClick={redirectToRegister}>Register</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;