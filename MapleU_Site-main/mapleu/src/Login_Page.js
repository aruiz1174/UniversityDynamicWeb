import { React, useState } from 'react';
import './login.css';
import postUserCheck from './SharedService'
import { UserId_Subject$, UserType_Subject$, isLoggedIn_Subject$, UserName_Subject$ } from './PersistenceService';
import md5 from "md5";



function Login_Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  var localUserToken = JSON.parse(localStorage.getItem("userToken"));

  if (localUserToken !== null) {
    postUserCheck(localUserToken.userId, localUserToken.password, false).then(x => {

      if (x.data !== null) {
        UserId_Subject$.next(x.data.userId);
        UserType_Subject$.next(x.data.UserType);
        UserName_Subject$.next(x.data.fname + " " + x.data.lname);
        isLoggedIn_Subject$.next(x.data.login);
      }

    });
  }

  // create const to hold the number of attemps
  const [attemps, setAttemps] = useState(2);

  const loginOnclick = () => {
    var isCleared = true;

    if (username === '' && password === '' ||
      username === '' || password === '') {
      alert("Please Enter a Username and Password");
      isCleared = false
    }

    if (isCleared === true) {

      postUserCheck(username, password, true).then(x => {

        console.log(x);

        if (x.data !== null) {
          UserId_Subject$.next(x.data.userId);
          UserType_Subject$.next(x.data.UserType);
          UserName_Subject$.next(x.data.fname + " " + x.data.lname);
          isLoggedIn_Subject$.next(x.data.login);

          if (x.data.login === true) {
            localStorage.removeItem("userToken");
            var userData =
            {
              "userId": md5(username),
              "password": md5(password)
            };
            localStorage.setItem('userToken', JSON.stringify(userData));
            // go to profile
            window.location.assign("./Profile");
          }

          else if (x.data.login === false) {
            // decrement the attemps
            setAttemps(attemps - 1);
            alert("Invalid Username or Password. You have " + attemps + " attemps left");

            if (attemps === 0) {
              alert("You have exceeded the number of attemps. A new password has been sent to your email.");


              window.location.assign("./");
            }
            // stay on login page and clear the fields
            setPassword('');

          }
        }

      });
    }

  }



  return (
    <>
      <meta charSet="UTF-8" />
      <title>Login</title>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
      />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="./login.css" />
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Maple Leaf</h1>
            <p>
              The best place to start your higher education for a brigther future.
            </p>
            <span>
              <p>Go back to Homepage:</p>
              <a href="./">
                <i className="">HOMEPAGE</i>
              </a>
              <i className=""></i>
            </span>
            <i className=""></i>
          </div>
          <i className=""></i>
        </div>
        <i className="">
          <div className="right">
            <h5>Login</h5>
            <p>Use your email and password to login to your account</p>
            <form id="login-form">
              <div className="form-group">
                <input type="text" className="loginUser" placeholder="Enter Email"
                  onChange={(e) => setUsername(e.target.value)} value={username} />
              </div>
              <div className="form-group">
                <input type="password" autoComplete="on" className="loginPassword" placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <div>
                {/* <button onClick={loginOnclick} className="button" type="button"> Login</button> */}
              </div>
              <br />


              <input
                type="button"
                defaultValue="Login"
                className="btn btn-primary"
                id="submit"
                onClick={loginOnclick}


              />

            </form>
          </div>
        </i>
      </div>
      <i className="">{/* partial */}</i>
    </>

  );
}
export default Login_Page;

