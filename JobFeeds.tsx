import React, { useEffect, useState } from 'react';
import styles from './JobFeed.module.css';
import axios from 'axios';
import moment from 'moment';

const JobFeed = () => {
  const API_FETCH_JOB_IDS = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
  const API_FETCH_JOB_CONTENT = `https://hacker-news.firebaseio.com/v0/item`;

  const [postList, setPostList] = useState([]);
  const [jobIds, setJobIds] = useState([]);

  const fetchAllJobIds = async () => {
    const response = await axios.get(API_FETCH_JOB_IDS);
    const jobIds = response.data;
    fetchJobByIDs(jobIds);
  };

  const fetchJobByIDs = (jobIds) => {
    jobIds.forEach((id) => {
      axios.get(`${API_FETCH_JOB_CONTENT}/${id}.json`).then((response) => {
        setPostList((posts) => [...posts, response.data]);
      });
    });
  };

  useEffect(() => {
    fetchAllJobIds();
  }, []);

  return (
    <div>
      <div className={styles.allPostsContainer}>
        {postList.map((post) => (
          <a href={post?.url} target="_blank" style={{ TextDecoder: 'none' }}>
            <div className={styles.postContainer}>
              <p>{post.id}</p>
              <h1>{post.title}</h1>
              <p>{moment(post?.time).format('Do MMM YYYY hh:mm a')}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default JobFeed;
