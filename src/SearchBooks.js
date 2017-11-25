import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash'

class SearchBooks extends Component {

    constructor(props) {
        super(props);
        this.updateQuery = _.debounce(this.updateQuery, 300);
    }

    state = {
        books: []
    }

    verifyActualBooks(books){
        const { currentlyReading, read, wantToRead } = this.props.actualBooks

        wantToRead.forEach(sbook => {
            var index = books.findIndex(function (obj) { return obj.id === sbook.id; })
            console.log(index)
            if(index != -1){
                books[index].shelf = "wantToRead"
            }
        })
        
        read.forEach(sbook => {
            var index = books.findIndex(function (obj) { return obj.id === sbook.id; })
            console.log(index)
            if(index != -1){
                books[index].shelf = "read"
            }
        })

        currentlyReading.forEach(sbook => {
            var index = books.findIndex(function (obj) { return obj.id === sbook.id; })
            console.log(index)
            if(index != -1){
                books[index].shelf = "currentlyReading"
            }
        })

        this.setState({books: books})
    }

    updateQuery = (query) => {
        BooksAPI
            .search(query)
            .then((books) => {
                if (books && books.constructor === Array) {
                    this.verifyActualBooks(books)
                } else {
                    this.setState({books: []})
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const {books} = this.state
        return (
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
                */
                        }
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books
                                ? books.map((crbook) => (
                                    <li key={crbook.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div
                                                    className="book-cover"
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${crbook.imageLinks
                                                            ? crbook.imageLinks.smallThumbnail
                                                            : ''})`
                                                    }}></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        value={(crbook.shelf ? crbook.shelf : 'none')}
                                                        onChange={(e) => this.props.onChange(crbook, e.target.value)}>
                                                        <option value="none" disabled="disabled">Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{crbook.title}</div>
                                            <div className="book-authors">{
                                                    crbook.authors
                                                        ? crbook.authors[0]
                                                        : ''
                                                }</div>
                                        </div>
                                    </li>
                                ))
                                : ''
                        }
                    </ol>
                </div>
            </div>
        )
    }

}

export default SearchBooks