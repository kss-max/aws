import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';
import AdminCreate from './pages/AdminCreate';
import AdminEdit from './pages/AdminEdit';
import AdminRegistrations from './pages/AdminRegistrations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Module */}
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Module */}
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
        <Route path="/admin/registrations" element={<AdminRegistrations />} />
      </Routes>
    </BrowserRouter>
  );
}
