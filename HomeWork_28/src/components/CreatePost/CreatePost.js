import React, { useState } from 'react';
import shortid from 'shortid';
import styles from './createpost.module.css';

const CreatePost = ({ handlerSubmit }) => {
  const [ inputTitleValue, setInputTitleValue ] = useState('');
  const [ inputTextValue, setInputTextValue ] = useState('');
  const [ selectValue, setSelectValue ] = useState('');

    return (
      <>
        <form
          className={styles.form}
          onSubmit = {e => {
            e.preventDefault();
            
            const post = {
              title: inputTitleValue,
              text: inputTextValue,
              select: selectValue,
              id: shortid()
            }
            
            handlerSubmit(post);
            e.target.reset();
          }}
          >
          <label>
            Post title
            <input className={styles.form__field} type='text' placeholder='Post title' required
              onInput = {e => {
                setInputTitleValue(e.target.value);
              }}
              />
          </label>
          <label>
            Post message
            <textarea className={styles.form__field} type='text' placeholder='Post text' required
              onInput = {e => {
                setInputTextValue(e.target.value);
              }}
              />
          </label>
          <label>
            Choose tag
            <select className={styles.form__choose} name='tags' required
              onChange = {e => {
                setSelectValue(e.target.value);
              }}
              >
              <option className={styles.form__opt} value=''>none</option>
              <option className={styles.form__opt} value='story'>story</option>
              <option className={styles.form__opt} value='natural'>natural</option>
              <option className={styles.form__opt} value='history'>history</option>
            </select>
          </label>
          <button 
            className={styles.form__btn}
            type='submit'
            disabled = {!Boolean(inputTitleValue.trim()) || !Boolean(inputTextValue.trim()) || !Boolean(selectValue)}
            >
            Add post
          </button>
        </form>
      </>
    )
  }
  
  export default CreatePost;