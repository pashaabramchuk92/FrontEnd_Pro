import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './postpage.module.css';

const PostPage = ({ 
    data,
    removeCallback,
    match: {
        params: { id }
    },
    history
}) => {
    const post = data.find(x => x.id === id);

    return (
        <section className={styles.full_post}>
            <div>
                <h2 className={styles.title}>{post.title}</h2>
            </div>
            <p className={styles.text}>{post.text}</p>
            <div className={styles.wrapper}>
                <Link to='/' className={styles.home}>
                    <i class="fa fa-home"></i>
                    Home
                </Link>
                <button
                    className={styles.btn}
                    onClick = {() => {
                        removeCallback(post.id)
                        history.replace('/')
                    }}
                >
                    delete
                </button>
            </div>
        </section>
    );
}

export default withRouter(PostPage);
