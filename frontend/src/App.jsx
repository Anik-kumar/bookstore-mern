import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import CreateBook from './pages/CreateBook.jsx';
import EditBook from './pages/EditBook.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import ShowBooks from './pages/ShowBooks.jsx';
// import EditBook from './pages/EditBook';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/details/:id' element={<ShowBooks />} />
      {/* <Route path='' element={} /> */}
    </Routes>
  )
}

export default App;