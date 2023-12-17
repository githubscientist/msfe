import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/users';
import postServices from '../services/posts';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [postsFormData, setPostsFormData] = useState([]);

    useEffect(() => {
        // get the user from the session storage
        const user = sessionStorage.getItem('user');

        console.log(`user `, user);

        if (user) {
            // dispatch the user object to the redux store
            dispatch({
                type: 'SET_USER',
                payload: JSON.parse(user)
            });
        }

        // if the user is not in the session storage, redirect to the login page
        if (!user) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {

        // get the token from the session storage and call the backend to get the user using the token
        userServices.getUser()
            .then(user => {
                console.log(user);

                // create a user object to store in the redux store
                const userObject = {
                    username: user.username,
                    name: user.name,
                }

                // dispatch the user object to the redux store
                dispatch({
                    type: 'SET_USER',
                    payload: userObject
                });
            })
            .catch(error => {
                console.log(error);
            });
        
        // get the posts from the backend and store it in the redux store
        postServices.getPosts()
            .then(posts => {
                console.log(posts);

                // dispatch the posts object to the redux store
                dispatch({
                    type: 'SET_POSTS',
                    payload: posts
                });
            })
            .catch(error => {
                console.log(error);
            });
        
    }, []);

    const user = useSelector(state => state.user);
    const posts = useSelector(state => state.posts);

    console.log(user.user);

    const handleLogout = () => {

        // remove the user from the session storage
        sessionStorage.removeItem('user');

        // remove the user from the redux store
        dispatch({
            type: 'UNSET_USER',
        });

        // remove the token from the session storage
        sessionStorage.removeItem('token');

        // redirect to the login page
        navigate('/signin');
    }
  return (
    <div>
          {
              user.user &&
              <div>
                      <h3>Welcome to the Application</h3>
                      <p>{user.user.name} has signed in! <button onClick={handleLogout}>logout</button></p>
                      
                      <h5>Your Posts Feed</h5>
                      <ul>
                          {
                                posts.posts && posts.posts.map(post => {
                                    return (
                                        <li key={post._id}>{post.title}</li>
                                    )
                                })
                          }
                      </ul>

                      <h5>Create a New Post</h5>
                        <form>
                          <input type="text" placeholder="title..." 
                            onChange={(event) => {
                                setPostsFormData({
                                    ...postsFormData,
                                    title: event.target.value
                                });
                            }}
                              value={postsFormData.title}
                            />
                          <input type="text" placeholder="description..." 
                            onChange={(event) => {
                                setPostsFormData({
                                    ...postsFormData,
                                    description: event.target.value
                                });
                            }}
                              value={postsFormData.description}
                            />
                          <button>Create Post</button>
                        </form>
              </div>
        }    
    </div>
  )
}

export default Dashboard;