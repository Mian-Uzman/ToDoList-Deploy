import React, { useState, useEffect } from 'react';
import Header from "./components/UI/Header";
import HomePage from "./components/UI/HomePage";
import ToDoList from "./components/List/ToDoList";
import Items from "./components/Items/Items";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/UI/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [username, SetUsername] = useState('');
  const [logged_in, SetLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [displayForm, setDisplayForm] = useState(true);



  const handle_login = (e, data) => {
    e.preventDefault();
    fetch('/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        SetLoggedIn(true);
        SetUsername(json.username);
      }).catch(err => console.log(err));

  };

  const handle_signup = (e, data) => {
    e.preventDefault();
    fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        SetLoggedIn(true);
        SetUsername(json.username);
      }).catch(err => console.log(err));;
  };


  const handle_logout = () => {
    localStorage.removeItem('token');
    SetLoggedIn(false);
    SetUsername('')
      .catch(err => console.log(err));
  };


  const loggedIn = () => {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/lists' component={ToDoList} />
            <Route exact path='/lists/:listID' component={Items} />
          </Switch>
        </Router>
      </React.Fragment>

    )
  }

  const loggedOut = () => {
    return (
      <div >
        {displayForm ? (
          <Login handle_login={handle_login} setDisplayForm={setDisplayForm} />
        ) :
          <Register handle_signup={handle_signup} setDisplayForm={setDisplayForm} />
        }
      </div>
    )
  }

  useEffect(() => {
    if (logged_in) {
      fetch('/api/current-user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          SetUsername(json.username);

        }).catch(err => console.log(err));
    }
  }, [logged_in]);


  return (
    <React.Fragment>
      <Header
        logged_in={logged_in}
        handle_logout={handle_logout}
        username={username}
      />
      {logged_in ? loggedIn() : loggedOut()}
      <Footer />
    </React.Fragment>

  )
}


export default App;



