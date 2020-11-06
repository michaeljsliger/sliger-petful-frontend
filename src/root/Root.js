import React from 'react'
import Header from './Header';
import Adoption from '../Adoption/Adoption';
import Home from './Home';
import './root.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function Root() {
  return <div className="root">
    <Header />
    <div>
      <Router>
      <Route exact path="/" component={Home} />
      <Route path="/adopt" component={Adoption} />
      </Router>
    </div>
  </div>
}

export default Root
