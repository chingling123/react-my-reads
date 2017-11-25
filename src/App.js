import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ShelfBooks from './ShelfBooks' 
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({
          currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
          read: books.filter((book) => book.shelf === "read"),
          wantToRead: books.filter((book) => book.shelf === "wantToRead")
        })
    })
  }

  removeBook(book){
    switch(book.shelf){
      case "currentlyReading":
        this.setState((state) => ({
          currentlyReading: state.currentlyReading.filter((c) => c.id !== book.id)
        }))
        break;
      case "read":
        this.setState((state) => ({
          read: state.read.filter((c) => c.id !== book.id)
        }))
        break;
      case "wantToRead":
        this.setState((state) => ({
          wantToRead: state.wantToRead.filter((c) => c.id !== book.id)
        }))
        break;
      default:
        break;
    }
  }

  changeSelfBook(book, value){
    book.shelf = value;
    switch(value){
      case "currentlyReading":
        this.setState((state) => ({
          currentlyReading: state.currentlyReading.concat(book)
        }))
        break;
      case "read":
        this.setState((state) => ({
          read: state.read.concat(book)
        }))
        break;
      case "wantToRead":
        this.setState((state) => ({
          wantToRead: state.wantToRead.concat(book)
        }))
        break;
      default:
        break;  
    }
  }

  change(book, value){
    BooksAPI.update(book, value)
    this.removeBook(book)
    this.changeSelfBook(book,value)
  }

  render(){
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ShelfBooks books={this.state} onChange={(book, value) =>{
              this.change(book, value)
            }}/>
        )}/>
        <Route path="/search" render={({history}) => (
          <SearchBooks actualBooks={this.state} onChange={(book, value) =>{
              this.change(book, value)
            }}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
