import React from 'react';
import { Link } from 'react-router-dom';
import styles from './list.module.css';

const List = ({ items }) => {
    return (
        <ul className={styles.list}>
            {
                items.map((post) => {
                    return (
                        <li key={post.id} className={styles.item}>
                            <h2 className={styles.title}>
                                <Link to={`/post${post.id}`} className={styles.link}>
                                    {post.title}
                                    <span> read more</span>
                                </Link>
                            </h2>
                            <p className={styles.text}>{post.text}</p>
                            <span className={styles.tag}>{post.select}</span>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default List;