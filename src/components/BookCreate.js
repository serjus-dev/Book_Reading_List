import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookCreate(){

    const [title, setTitle] = useState('');

    const { createBook } = useBooksContext();

    //this will trigger every time that input in the form change
    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    //this will trigger when ther form is send and call the function
    // in App passing the title 
    const handleSubmit = (event) => {
        event.preventDefault();
        createBook(title)
        setTitle('')
    }

    return(
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange} />
                <button className="button">Create!</button>
            </form>
        </div>

      ); 
    }

export default BookCreate;