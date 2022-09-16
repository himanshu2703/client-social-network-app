import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';

const REGISTER_DETAILS =  gql`
mutation registerUser($username: String!, $email: String!, $password: String!) {
  registerUser(
    registerInput:{
        username: $username, email: $email, password: $password
    }
    ){
    username
    email
    token
  }
}
`;
function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpnfPassword, setConfPassword] = useState('');

    const [registerUser, { loading }] = useMutation(REGISTER_DETAILS, {
        update(
          _,result
        ) {
            console.log(result)
            localStorage.setItem('access-token', result.data.registerUser.token);
            navigate('/feed');
        },
        onError(err) {
          console.log(err);
        },
        variables: {
            username: username,
            email: email,
            password: password
        }
    });

    useEffect(()=>{

    },[]);

    const redirectToLogin = () => {
        navigate('/login');
    }

    const handleChange = (e : any) => {
        let name = e.target.name;
        if(name === 'username') {
            setUsername(e.target.value);
        } else if (name === 'email') {
            setEmail(e.target.value);
        } else if (name === 'password') {
            setPassword(e.target.value);
        } else if (name === 'confirmpassword') {
            setConfPassword(e.target.value)
        }
    }

    const handleSubmit = () => {
        console.log(email, password);
        registerUser();
    }

    return (
        <div className="section is-fullheight">
            <div className="container">
                <div className="column is-6 is-offset-3">
                    <div className="box">
                        <h1>Register</h1>
                        <div className="field">
                            <label className="label">User Name</label>
                            <div className="control">
                            <input
                                autoComplete="off"
                                className={`input`}
                                type="text"
                                name="username"
                                onChange={handleChange}
                                value={username || ""}
                                required
                            />
                            </div>
                        </div>
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
                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                                <input
                                className={`input`}
                                type="password"
                                name="confirmpassword"
                                onChange={handleChange}
                                value={cpnfPassword || ""}
                                required
                                />
                            </div>
                        </div>
                        <button
                            className="button is-block is-info is-fullwidth"
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                        <div className='login-acc'>
                            <span className='text-message'>Already a user ?</span><span className='login' onClick={redirectToLogin}>Login</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;