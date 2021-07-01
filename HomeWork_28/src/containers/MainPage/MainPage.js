import React from 'react';
import CreatePost from '../../components/CreatePost/CreatePost';
import List from '../../components/List/List';
import Search from '../../components/Search/Search';
import styles from './mainpage.module.css';

const MainPage = ({ data, createCallback, filterCallback }) => {
  return (
    <div className={styles.grid_container}>
      <CreatePost handlerSubmit={createCallback} />
      <Search
        data = {data}
        handlerFilter = {filterCallback}
      />
      <List
        items={data}
      />
    </div>
  );
}

export default MainPage;
