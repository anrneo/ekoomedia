import React from 'react';

import './App.scss';

function App() {
  return (
    <div className="App">
     
<div className="nav">
  <h1>Hello World</h1>
</div>

<div className="list">
  <div className="menu">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
    <a href="#">Link 4</a>
  </div>

  <div className="main">
    <h2>Lorum Ipsum</h2>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
  </div>

  <div className="right">
    <h2>About</h2>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
  </div>
</div>

<div className="footer">Prueba Técnica</div>
</div>
  )
}

export default App;
