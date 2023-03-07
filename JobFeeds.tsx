import React, { use, useEffect, useState } from 'react';
import styles from './JobFeed.module.css';
import axios from 'axios';
import moment from 'moment';

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
  }, []);

  const fetchAllJobIds = async () => {
    const response = await axios.get(API_FETCH_JOB_IDS);
    const jobIds = response.data;
    // setJobIds(jobIds);
    //pagenation
    if (!isEnd) {
      const splitedJobIds = jobIds.splice(pageNumber * perPage, perPage);
      fetchJobByIDs(splitedJobIds);
      // console.log(splitedJobIds);
      // setPageNumber(pageNumber + 1);
    }

    if (postList.length >= jobIds.length) {
      setIsEnd(true);
    }
  };

  const fetchJobByIDs = (ids) => {
    console.log(ids);

    ids.forEach((id) => {
      axios.get(`${API_FETCH_JOB_CONTENT}/${id}.json`).then((response) => {
        console.log(response.data);

        setPostList((postList) => [...postList, response.data]);
      });
    });
    console.log(postList);
  };

  const Post = ({ post }) => {
    return (
      <a href={post?.url} target="_blank" style={{ TextDecoder: 'none' }}>
        <div className={styles.postContainer}>
          <p>{post.id}</p>
          <h1>{post.title}</h1>
          <p>{moment(post?.time).format('Do MMM YYYY hh:mm a')}</p>
        </div>
      </a>
    );
  };

  return (
    <div>
      <div className={styles.allPostsContainer}>
        {postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default JobFeed;
