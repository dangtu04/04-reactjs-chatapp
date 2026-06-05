import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatApp from "./pages/ChatApp";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
