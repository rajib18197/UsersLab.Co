import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* <Route index element={<Navigate to="users" replace />} /> */}
          <Route index element={<Users />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
