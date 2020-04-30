import React from 'react';
import ProfileInfo from './profileInfo';
import UserRecipes from './userRecipes';

const Profile = ({ session }) => (
  <div className="App">
    <ProfileInfo session={session} />
    <UserRecipes username={session.getCurrentUser.username} />
  </div>
)

export default Profile