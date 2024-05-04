import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import HomePage from "./pages/homepage";
import BlogPage from "./pages/blogPage";
import BlogDetailPage from "./pages/blogDetailPage";
import AddBlog from "./pages/addBlog";
import { AuthProvider } from "./lib/authProvider";
import LoginPage from "./pages/login";

function App() {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 700,
  //     easing: "ease-out-cubic",
  //   });
  // }, []);
  return (
    <Router>
      <AuthProvider>

      
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/add" element={<AddBlog />} />





        {/* Define your other routes here */}
      </Routes>
      <Footer />
      </AuthProvider>
    </Router>

  );
}

export default App;
