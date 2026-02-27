import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';

import Landing from './pages/Landing';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminCreate from './pages/AdminCreate';
import AdminEdit from './pages/AdminEdit';
import AdminRegistrations from './pages/AdminRegistrations';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import AdminNewsList from './pages/AdminNewsList';
import AdminNewsCreate from './pages/AdminNewsCreate';

import Announcements from './pages/Announcements';
import AdminAnnouncements from './pages/AdminAnnouncements';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/announcements" element={<Announcements />} />

          {/* News – Public */}
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User-protected: event registration requires login */}
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin-only Routes – wrapped by AdminRoute guard */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* Default: redirect /admin → /admin/registrations */}
              <Route index element={<Navigate to="registrations" replace />} />
              <Route path="registrations" element={<AdminRegistrations />} />
              <Route path="create" element={<AdminCreate />} />
              <Route path="edit/:id" element={<AdminEdit />} />
              <Route path="announcements" element={<AdminAnnouncements />} />

              {/* News sub-routes rendered inside AdminLayout's <Outlet> */}
              <Route path="news" element={<AdminNewsList />} />
              <Route path="news/create" element={<AdminNewsCreate />} />
              <Route path="news/edit/:id" element={<AdminNewsCreate />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
