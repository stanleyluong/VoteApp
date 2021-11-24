import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import "bootstrap/dist/css/bootstrap.min.css"
// import { render } from 'react-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_DEV || "development")
import Home from './components/Home'
import PollingStation from './components/PollingStation'
import NewPoll from './components/NewPoll'
import StanleyLogo from './assets/profile-logo.png'

export default function App() {

  const changeCandidateFunction = async (prompt) => {
    console.log('prompt',prompt)
    let namePair = await window.contract.getCandidatePair({prompt:prompt})
    localStorage.setItem('Candidate1', namePair[0])
    localStorage.setItem('Candidate2', namePair[1])
    localStorage.setItem('prompt',prompt)
    window.location.replace(window.location.href+'PollingStation')
  }

  
  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <p><img src={StanleyLogo} width="30" height="30" alt="logo"></img>VoteApp</p>
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path='/'>
          <Home changeCandidates={changeCandidateFunction} />
        </Route>
        <Route exact path='/PollingStation'>
          <PollingStation />
        </Route>
        <Route exact path='/NewPoll'>
          <NewPoll />
        </Route>
      </Switch>
    </Router>
  )
}
