import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }){
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    }, []);


    //EDIT BOOK BY ID
    const editBookById = async(id, newTitle) => {

        const response = await axios.put(`http://localhost:3001/books/${id}`,{
            title: newTitle
        });

        const updatedBooks = books.map((book) =>{
            if(book.id === id){
                return {...book, ...response.data};
            }

            return book;
        });

        setBooks(updatedBooks)

        // const updateBooks = books.map((book) => {

        //     if(book.id === id){
        //         return {...book,title:newTitle }
        //     }

        //     return book;

        // });

        // setBooks(updateBooks);
    }


    //DELETE BOOK BY ID
    const deleteBookById = async (id) => {

        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book)=>{
            return book.id !==id;
        })

        setBooks(updatedBooks)
        

        // const updatedBooks = books.filter((book) => {
        //     return book.id !== id;
        // })

        // setBooks(updatedBooks);
    }


    // Create ADD book to screen
    const createBook = async (title) => {

        const response = await axios.post('http://localhost:3001/books',{
            title:title
        });

        const updatedBooks = [
            ...books, 
            response.data
        ];
        setBooks(updatedBooks);
        // const updateBooks = [
        //     ...books,
        //     { 
        //         id:Math.round(Math.random() * 9999), 
        //         title:title,
        //     }
        // ];

        // setBooks(updateBooks)
    };

    const valueToShare = {
        books: books,
        deleteBookById: deleteBookById,
        editBookById: editBookById,
        createBook,
        fetchBooks

    }

    return(
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>

    ) 
}

export { Provider };
export default BooksContext;