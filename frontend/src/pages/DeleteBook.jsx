import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:3000/api/books/${id}`)
      .then((resp) => {
        setLoading(false);
        console.log(resp);
        enqueueSnackbar('Book deleted successfully.', { variant: 'success' });
        // alert("Book is deleted");
        navigate('/');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar(error.message, {variant: 'error'});
        alert(err.message);
      })
  };

  const handleNoButton = () => {
    navigate('/');
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ' '}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-[600px]">
        <h3>This book is going to be deleted permanently.</h3>
        <h2 className="text-2xl">Are you sure you want to delete this book?</h2>
        <button 
          className='p-8 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it.
        </button>
        <button className='p-8 bg-slate-600 text-white m-8 w-full' onClick={handleNoButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteBook;