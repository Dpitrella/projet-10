
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './signin.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Signin() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setEmailError('')
        setPasswordError('')
        
        if (!email) {
            setEmailError('Please enter an email address')
            setIsLoading(false)
            return
        }
        if (!password) {
            setPasswordError('Please enter a password')
            setIsLoading(false)
            return
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password })
            });
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                if (data.error) {
                    return setError(data.error)
                }
                throw new Error("Erreur lors de la connexion");
            }

            if (data.body.token) {
                localStorage.setItem('token', data.body.token);
                navigate('/user', {
                    replace: true,
                });

            } else {
                throw new Error("Erreur lors de la connexion");
            }

        } catch (error) {
            console.error("Erreur d'inscription: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="body">
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <FontAwesomeIcon className="fa fa-user-circle sign-in-icon" icon={faUserCircle} />
                    <h1 className="signin">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label className="email">Email</label>
                            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <p className='error-message'> {emailError} </p>}
                        </div>
                        <div className="input-wrapper">
                            <label for="password">Password</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                            {passwordError && <p className='error-message'> {passwordError} </p>}
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me </label>

                        </div>
                        <button className='sign-in-button'> Sing in</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </section>
            </main>
        </div>

    )
}
export default Signin