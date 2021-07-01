import React, { useState, useCallback } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainPage from './containers/MainPage/MainPage';
import PostPage from './containers/PostPage/PostPage';
import styles from './app.module.css';

const history = createBrowserHistory();

const App = () => {
    const [posts, setPosts] = useState([]);

    const createPostHandler = useCallback(
        post => setPosts([post, ...posts]),
        [posts]
    );

    const removePostHandler = useCallback(
        id => setPosts(posts.filter(post => post.id !== id)),
        [posts]
    );

    const filterPostTagHandler = useCallback(
        select => setPosts(posts.filter(post => post.select === select)),
        [posts]
    )

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Some Blog</h1>
            <Router history = {history}>
                <Switch>
                    <Route 
                        path = '/'
                        exact
                        render = {() => (
                            <MainPage 
                                data = {posts}
                                createCallback = {createPostHandler}
                                filterCallback = {filterPostTagHandler}
                            />
                        )}
                    />
                    <Route 
                        path = '/post:id'
                        render = {() => (
                            <PostPage
                                data = {posts}
                                removeCallback = {removePostHandler}
                            />
                         )}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default App;