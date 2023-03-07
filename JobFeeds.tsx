import React, { useEffect, useState } from 'react';
import styles from './JobFeed.module.css';
import axios from 'axios';
import moment from 'moment';

const JobFeed = () => {
  const API_FETCH_JOB_IDS = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
  // const API_FETCH_JOB_CONTENT = `https://hacker-news.firebaseio.com/v0/item`;

  const [postList, setPostList] = useState([]);
  const [jobIds, setJobIds] = useState([]);

  const fetchAllJobIds = async () => {
    const response = await axios.get(API_FETCH_JOB_IDS);
    const postIds = response.data;
    // console.log(postIds);
    fetchJobByIDs(postIds);

    // console.log(response.data);
  };

  const fetchJobByIDs = (idList) => {
    idList.forEach((postId) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
        .then((response) => {
          setPostList((posts) => [...posts, response.data]);
          console.log(response.data);
          console.log(postList);
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
