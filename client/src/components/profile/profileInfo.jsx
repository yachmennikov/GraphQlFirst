import React from 'react';
import { Link } from 'react-router-dom';


const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`
}

const ProfileInfo = ({ session }) => {
  return (
    <div>
      <h3>User info</h3>
      <p>Username: { session.getCurrentUser.username } </p>
      <p>E-Mail: { session.getCurrentUser.email } </p>
      <p>Join Date: { formatDate(session.getCurrentUser.joinDate) } </p>
      <ul>
        <h3>{ session.getCurrentUser.username }'s favorite</h3>
        {
          session.getCurrentUser.favorites.map( favorite => {
            return (
              <li key={favorite._id}>
                <Link to={`recipes/${favorite._id}`}>
                  <p>
                    { favorite.name }
                  </p>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  
  )
}

export default ProfileInfo