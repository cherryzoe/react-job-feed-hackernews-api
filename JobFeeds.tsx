import React, { use, useEffect, useState } from 'react';
import styles from './JobFeed.module.css';
import axios from 'axios';
// import moment from 'moment';
import { format } from 'date-fns';

const JobFeed = () => {
  const API_FETCH_JOB_IDS = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
  const API_FETCH_JOB_CONTENT = `https://hacker-news.firebaseio.com/v0/item`;

  const [postList, setPostList] = useState([]);
  const [jobIds, setJobIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    fetchAllJobIds();
    console.log('useEffect');
  }, [pageNumber]);

  const fetchAllJobIds = async () => {
    if (!isEnd) {
      const response = await axios.get(API_FETCH_JOB_IDS);
      const jobIds = response.data;

      //pagenation
      const splitedJobIds = jobIds.splice(pageNumber * perPage, perPage);
      fetchJobByIDs(splitedJobIds);

      if (postList.length >= jobIds.length) {
        setIsEnd(true);
      }
    }
  };

  const fetchJobByIDs = (ids) => {
    // console.log(ids);

    ids.forEach((id) => {
      axios
        .get(`${API_FETCH_JOB_CONTENT}/${id}.json`)
        .then((response) => {
          console.log(response.data);

          setPostList((postList) => [...postList, response.data]);
        })
        .catch((err) => console.log(err));
    });
  };

  const Post = ({ post }) => {
    const date = new Date(post.time);
    console.log(post.time);
    return (
      <a href={post?.url} target="_blank" style={{ TextDecoder: 'none' }}>
        <div className={styles.postContainer}>
          <p>{post.id}</p>
          <h1>{post.title}</h1>
          <p>{format(date, 'MMMM do, yyyy')}</p>
        </div>
      </a>
    );
  };

  return (
    <div className={styles.allPostsContainer}>
      <div className={styles.allPostsContainer}>
        {postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {!isEnd && (
        <button
          className={styles.button}
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Load More jobs
        </button>
      )}
    </div>
  );
};
export default JobFeed;
