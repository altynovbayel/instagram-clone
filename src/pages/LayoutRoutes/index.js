import React from 'react';
import {Route, Routes} from "react-router-dom";
import * as Layout from "../../apps/MainPages";
import Sidebar from "../../components/Sidebar";

function LayoutRoutes() {
  return (
    <div style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      paddingBottom: '50px',
      backgroundAttachment: 'fixed',
      color: '#FAFAFA',
    }}>
      <Sidebar/>
      <Routes>
        <Route path={'/likes'} element={<Layout.Likes/>}/>
        <Route path={'/post_create'} element={<Layout.PostCreate/>}/>
        <Route path={'/user/:id'} element={<Layout.AnotherUser/>}/>
        <Route path={'/search'} element={<Layout.SearchUsers/>}/>
        <Route path={'/profile/edit'} element={<Layout.UserEdit/>}/>
        <Route path={'/profile'} element={<Layout.UserProfile/>}/>
        <Route path={'/'} element={<Layout.Main/>}/>
        <Route path={'*'} element={<Layout.Main/>}/>
      </Routes>
    </div>
  );
}

export default LayoutRoutes;