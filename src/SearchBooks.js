import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeform from 'form-serialize' 
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component{

    state = {
        books: []
    }

    updateQuery = (query) => {
        BooksAPI.search(query).then((books) => {
            if(books &&  books.constructor === Array){
                this.setState({books: books})
            }else{
                this.setState({books: []})
            }
            console.log(books)
        })
    }
        
    handleSubmit = (e) => {
        e.preventDefault();
     }

    render(){
        const { books } = this.state
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {books ? books.map((crbook) => (
              <li key={crbook.id}>
                  <div className="book">
                  <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${crbook.imageLinks ? crbook.imageLinks.smallThumbnail : ''})` }}></div>
                      <div className="book-shelf-changer">
                      <select value="none" onChange={(e) => this.props.onChange(crbook, e.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                      </select>
                      </div>
                  </div>
                  <div className="book-title">{crbook.title}</div>
                  <div className="book-authors">{crbook.authors ? crbook.authors[0] : ''}</div>
                  </div>
              </li>
            )) : ''}
              </ol>
            </div>
          </div>
        )
    }

}

export default SearchBooks