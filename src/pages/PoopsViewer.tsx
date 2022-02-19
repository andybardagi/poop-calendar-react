import React from 'react';
import NavBar from '../components/Navbar';
import UserList from '../components/ViewPoops/UserList';

export default function PoopsViewer() {
  return (
    <div>
      <NavBar />
      <UserList />
    </div>
  );
}
