import { Toaster } from "sonner";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import SignUpPage from "./pages/auth/SignUpPage";
import useAuthStore from "./stores/useAuthStore";
import CreditPopup from "./components/CreditPopup";
import NotFoundPage from "./pages/404/NotFoundPage";
import CreditsPage from "./pages/credits/CreditsPage";
import LibraryPage from "./pages/library/LibraryPage";
import PlaylistPage from "./pages/playlist/PlaylistPage";
import ProtectedAdminRoute from "./hoc/ProtectAdminRoute";

function App() {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <CreditPopup />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUpPage />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
          <Route path="/library" element={<LibraryPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/credits" element={<CreditsPage />} />
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
