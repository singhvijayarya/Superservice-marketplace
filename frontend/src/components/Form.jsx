import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIn from "../components/LoadingIn"
import "../styles/FormLogin.css"

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("Login response:", res.data);
        navigate("/"); // Redirect to home after login
      } else {
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login after registration
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (

//   <div className="full_form">
//   <form onSubmit={handleSubmit} className="form-container">
//     <div className="form-header">
//       <h1>{name}</h1>
//       <p className="form-subtitle">Welcome back! Please enter your details</p>
//     </div>
    
//     <div className="input-group">
//       <label htmlFor="username" className="input-label">Username</label>
//       <input
//         id="username"
//         className="form-input"
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter your username"
//       />
//     </div>
    
//     <div className="input-group">
//       <label htmlFor="password" className="input-label">Password</label>
//       <input
//         id="password"
//         className="form-input"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="••••••••"
//       />
//     </div>
    
//     {loading && <LoadingIn />}
    
//     <button className="form-button" type="submit">
//       {name}
//       <span className="button-icon">→</span>
//     </button>

//     <div className="form-footer">
//       <div className="form-switch">
//         {method === "login" ? (
//           <p>
//             Don't have an account?{" "}
//             <span className="form-link" onClick={() => navigate("/register")}>
//               Sign up
//             </span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span className="form-link" onClick={() => navigate("/login")}>
//               Login
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   </form>
// </div>

//   );

<div className="full_form">
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-header">
      <h1>{name}</h1>
      <p className="form-subtitle">Welcome back! Please enter your details</p>
    </div>

    <div className="input-group">
      <label htmlFor="username" className="input-label">Username</label>
      <input
        id="username"
        className="form-input"
        type="text"
        maxLength={50} // varchar equivalent
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
      />
    </div>

    <div className="input-group">
      <label htmlFor="password" className="input-label">Password</label>
      <input
        id="password"
        className="form-input"
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />
    </div>

    {loading && <LoadingIn />}

    <button className="form-button" type="submit">
      {name}
      <span className="button-icon">→</span>
    </button>

    <div className="form-footer">
      <div className="form-switch">
        {method === "login" ? (
          <p>
            Don't have an account?{" "}
            <span className="form-link" onClick={() => navigate("/register")}>
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="form-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  </form>
</div>
  );
}

export default Form;