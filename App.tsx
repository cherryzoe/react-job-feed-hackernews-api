import * as React from 'react';
import styles from './JobFeed.module.css';
import JobFeed from './JobFeeds';

export default function App() {
  return (
    <div className="container">
      <h1 className={styles.header}>Hackernews Jobs</h1>
      <JobFeed />
    </div>
  );
}
