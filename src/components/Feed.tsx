import React, {useState, useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import PostCard from '../widgets/PostCard';
import CreatePostPopup from '../widgets/CreatePostPopup';
import './Feed.scss';

const FETCH_POSTS_QUERY = gql`
  { 
    userPosts {
      name
      posts {
        _id,
        title,
        description,
        location
      }
    }
  }
`;
function Feed() {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    const [postPopup, setPostPopup] = useState(false);
    console.log(data);
    const createPost = () => {
        setPostPopup(true);
    }
    const closePopup = () => {
        setPostPopup(false);
    }

    let username = data?.userPosts?.name || '';
    let header = `Welcome ${username} to your feeds, Check What's new`;
    return (
        <div className='user-feed'>
            <h1 className="App">{header}</h1>
            <div className='create-post-btn'>
              <button onClick={createPost} className='createpost-button'>Create Post</button>
            </div>
            
            <div className='feed-container'>
              { data && data.userPosts?.posts.map((post: any, ind: any) => {
                  return <PostCard key={ind} post={post} />
              })}
            </div>
            
            {postPopup && <CreatePostPopup closePopup={closePopup} />}
        </div>
    );
}

export default Feed;
