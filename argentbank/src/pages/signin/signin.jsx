import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './signin.css'
import { Link } from "react-router-dom";

function Signin() {
    return (
        <div className="body">
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <FontAwesomeIcon className="fa fa-user-circle sign-in-icon" icon={faUserCircle} />
                    <h1 className="signin">Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label className="username">Username</label>
                            <input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label for="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me </label>

                        </div>
                        <Link to="/user" className="sign-in-button">Sign In</Link>
                    </form>
                </section>
            </main>
        </div>

    )
}
export default Signin