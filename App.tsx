import * as React from 'react';
import './style.css';
import JobFeed from './JobFeeds';

export default function App() {
  return (
    <div className="container">
      <h1 className="header">Hackernews Jobs</h1>
      <JobFeed />
    </div>
  );
}
