import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { NewsletterPage } from "./pages/NewsletterPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/newsletter/:slug" element={<PostDetailPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin/ingresar" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
