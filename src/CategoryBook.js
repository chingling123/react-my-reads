import React from 'react'

function CreateCategoryBooks(props){
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.list.map((crbook) => (
              <li key={crbook.id}>
                  <div className="book">
                  <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${crbook.imageLinks ? crbook.imageLinks.smallThumbnail : ''})` }}></div>
                      <div className="book-shelf-changer">
                      <select value={props.category} onChange={(e) => props.onChangeShelf(crbook, e.target.value)}>
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
            ))}
          </ol>
        </div>
      </div>
    )
}

export default CreateCategoryBooks