import React from 'react';
import styles from './search.module.css';

const Search = ({ data, handlerFilter }) => {
  return (
    <div>
      <input
        className={styles.search}
        placeholder='find post by tag'
        type='text'
        onChange={(e) => {
          data.forEach(post => {
            if(post.select === e.target.value) {
              handlerFilter(post.select);
            }
          })
        }}
      />
    </div>
  )
}

export default Search;