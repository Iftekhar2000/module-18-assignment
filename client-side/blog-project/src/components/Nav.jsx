//import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav'; // Adjust the import path based on your file structure
import Home from './Home'; // Import your Home component
import Blog from './BlogCard.jsx'; // Import your Blog component
import Contact from './Contact'; // Import your Contact component

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
