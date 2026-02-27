import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="create" element={<AdminCreate />} />
          <Route path="edit/:id" element={<AdminEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
