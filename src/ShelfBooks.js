import React,{Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import CategoryBook from './CategoryBook'
import * as BooksAPI from './BooksAPI'

class ShelfBooks extends Component{

    render(){
    
        // const { books } = this.props
        const { currentlyReading, read, wantToRead} = this.props.books
        
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CategoryBook title="Currently Reading" list={currentlyReading} onChangeShelf={this.props.onChange} category="currentlyReading"/>
                <CategoryBook title="Want to Read" list={wantToRead} onChangeShelf={this.props.onChange} category="wantToRead"/>
                <CategoryBook title="Read" list={read} onChangeShelf={this.props.onChange} category="read"/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"> Add a book</Link>
            </div>
            </div>
        )
    }

}

export default ShelfBooks