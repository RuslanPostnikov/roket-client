import React from 'react';
import './App.css';
import Categories from "./components/Categories/Categories";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import News from "./components/News/News";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Categories />}/>
        <Route path={'categories/:id'} element={<News />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
