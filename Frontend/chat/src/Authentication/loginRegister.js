import React, { useState } from 'react';
import './loginRegister.css'
import ReactCardFlip from 'react-card-flip';
import CallIcon from '@mui/icons-material/PhoneCallback';
import PassIcon from '@mui/icons-material/Lock';




function LoginSignup() {

    const [Flipped, setFlipped] = useState(false);

    const handleflip = (e) => {
        e.preventDefault();
        console.log("openregister")
        setFlipped(!Flipped)

    }



    return <div>
        <div className="login-register">
            <div className="login-register-box" >
                <ReactCardFlip className="inner-box" isFlipped={Flipped} flipDirection="horizontal">
                    <div className="front">
                        <h2>LOGIN TO YOUR ACCOUNT</h2>
                        <form>
                           <div className='login'><p><CallIcon style={{ color: "black" }} />
                                {' '}{' '}    <input type="email" className="input-box-f" placeholder="Email Address" required />
                            
                           </p> <p><PassIcon style={{ color: "black" }} /><input type="password" className="input-box-f" placeholder="Password" required />
                            {' '}{' '} <button type="submit" className="submit-btn"> LOGIN </button>
                       </p></div>
                        </form>
                        <button type="button" className="btn" onClick={handleflip}>Don't Have an Account? Register</button>
                        <a href="">Forgot Password?</a>
                    </div>
                    <div className="back">
                        <h2>CREATE AN ACCOUNT</h2>
                        <form>
                            <div className='register'>
                                <input type="phone" className="input-box" placeholder="Name" required />
                                <input type="email" className="input-box" placeholder="Email" required />
                                <input type="text" className="input-box" placeholder="Name Of Institute" required />
                                <select className="input-box" name="user_of_type" data-validation-error-msg="Select User Type" required>
                                    <option value>-- Type Of User --</option>
                                    <option value={1}>ALUMNI</option>
                                    <option value={2}>STUDENT</option>
                                    <option value={3}>FACULTY</option>
                                </select>
                                <select className="input-box" name="gender" placeholder='Gender' data-validation="required" data-validation-error-msg="Select Gender">
                                    <option value>-- Gender --</option>
                                    <option value={1}>Male</option>
                                    <option value={2}>Female</option>
                                </select>
                            
                        
                                <input type="tel" className="input-box" placeholder="Mobile Number" required />
                                <input type="password" className="input-box" placeholder="Password" required />
                                <input type="text" className="input-box" placeholder="Passing Year" required />

                                <select className="input-box" name="branch" data-validation-error-msg="Select branch" required>
                                    <option value>-- Branch --</option>
                                    <option value={1}>AUTOMOBILE ENGINEERING</option>
                                    <option value={2}>CIVIL ENGINEERING</option>
                                    <option value={3}>COMPUTER ENGINEERING</option>
                                    <option value={4}>ELECTRICAL ENGINEERING</option>
                                    <option value={5}>ELECTRONICS &amp; COMMUNICATION ENGINEERING</option>
                                    <option value={6}>INSTRUMENTATION &amp; CONTROL ENGINEERING</option>
                                    <option value={7}>MECHANICAL ENGINEERING</option>
                                    <option value={8}>ADMINISTRATION</option>
                                    <option value={9}>METALLURGY ENGINEERING</option>
                                    <option value={11}>GENERAL</option>
                                    <option value={12}>INSTITUTE</option>
                                </select>

                                <input type="text" className="input-box" placeholder="Address" required />
                            

                            <button type="submit" className="submit-btn"> REGISTER </button>
                            </div>
                        </form>
                        <button type="button" className="btn" onClick={handleflip}>Already have an account? Login</button>


                    </div>

                </ReactCardFlip>
            </div>
        </div>
    </div>;

}

export default LoginSignup;
