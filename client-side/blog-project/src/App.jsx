
//import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './pages/About';
import Blog from './pages/Blog';
import CreateBlogPage from './pages/CreateBlogPage';
import SingleBlogPage from './pages/SingleBlog';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Blog" exact component={Blog} />
          <Route path="/" exact component={About} />
          <Route path="/create" exact component={CreateBlogPage} />
          <Route path="/blogs/:blogId" component={SingleBlogPage} />
          <Route path="/login" component={LoginPage} />
          {/* Add more routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;