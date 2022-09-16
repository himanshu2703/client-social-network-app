import React, {useState, useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import PostCard from '../widgets/PostCard';
import CreatePostPopup from '../widgets/CreatePostPopup';

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      description
      title
      location
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
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
    return (
        <div className='user-feed'>
            <h1 className="App">Welcome to your Feed.. Check What's New</h1>
            <button onClick={createPost} className='createpost-button'>Create Post</button>
            { data && data.getPosts.map((post: any, ind: any) => {
                return <PostCard key={ind} post={post} />
            })}
            {postPopup && <CreatePostPopup closePopup={closePopup} />}
        </div>
    );
}

export default Feed;
