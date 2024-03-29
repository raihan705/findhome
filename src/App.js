import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import Offer from "./pages/Offer.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./component/Header.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import CreateList from "./pages/CreateList.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/*<Route path="/" element={<Home />}></Route>
  <Route path="/offer" element={<Offer />}></Route>*/}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Profile />}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/create-list" element={<PrivateRoute />}>
          <Route path="/create-list" element={<CreateList />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
