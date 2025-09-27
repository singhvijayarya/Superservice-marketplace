// import React, { useState } from "react";
// import axios from "axios";
// import { ACCESS_TOKEN } from "../constants";

// const ProviderForm = () => {
//   const [form, setForm] = useState({
//     username: "",
//     role: "",
//     phone: "",
//     address: "", 
//     profile_picture: null,
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     if (e.target.name === "profile_picture") {
//       setForm({ ...form, profile_picture: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const data = new FormData();
//     Object.entries(form).forEach(([key, value]) => data.append(key, value));

//     try {
//       const token = localStorage.getItem(ACCESS_TOKEN);
//       const res = await axios.post("http://localhost:8001/api/provider-form/", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert("Provider registered!");
//       //only role and profile pic set to the local because we access data from backend.
//       localStorage.setItem("role", "provider");
//       localStorage.setItem("profilePic", res.data.profile_picture); // ✅ Real image URL stored here
//       window.location.href = "/";
//     } catch (err) {
//       console.error("Error response:", err.response?.data);
//       setError(
//         err.response?.data?.detail ||
//         JSON.stringify(err.response?.data) ||
//         "Something went wrong."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
//       <div className="backdrop-blur-sm bg-white/80 p-8 rounded-xl shadow-lg w-full max-w-xl">
//         <h2 className="text-3xl font-bold mb-6 text-center">Provider Registration</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input name="username" required onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Role</label>
//             <input name="role" required onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Phone</label>
//             <input name="phone" required onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Address</label>
//             <input name="address" required onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Profile Picture</label>
//             <input name="profile_picture" type="file" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <button type="submit" className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProviderForm;
import React, { useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { motion } from "framer-motion";
import { Input, Button, Upload, message, Card, Typography } from "antd";
import { UploadOutlined, UserOutlined, IdcardOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ProviderForm = () => {
  const [form, setForm] = useState({
    username: "",
    role: "",
    phone: "",
    address: "", 
    profile_picture: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "profile_picture") {
      setForm({ ...form, profile_picture: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await axios.post("http://localhost:8001/api/provider-form/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("✅ Provider registered successfully!");
      localStorage.setItem("role", "provider");
      localStorage.setItem("profilePic", res.data.profile_picture);
      window.location.href = "/";
    } catch (err) {
      console.error("Error response:", err.response?.data);
      setError(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        "Something went wrong."
      );
      message.error("❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setForm({ ...form, profile_picture: file });
      return false;
    },
    showUploadList: false,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="w-full max-w-2xl"
      >
        <Card
          className="bg-[#1f1f3d]/90 border  border-[#e94560]/20 shadow-lg shadow-[#e94560]/10 rounded-2xl overflow-hidden p-4"
          hoverable
          bodyStyle={{ padding: "2rem" }}
        >
          <div className="text-center mb-8">
            <Title level={2} className="!mb-2 !text-transparent !bg-clip-text !bg-gradient-to-r !from-[#e94560] !to-[#ff7b54]">
              🚀 Provider Registration
            </Title>
            <p className="text-[#00000]/80">Fill in your details to join our network</p>
          </div>
          
          {error && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 p-4 bg-[#e94560]/10 border border-[#e94560] text-[#ff7b54] rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* <form onSubmit={handleSubmit} className="space-y-6  bg-[blue] ">
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <label className="block mb-2 font-medium  text-[#f1f1f1]">Username</label>
              <Input
                prefix={<UserOutlined className="text-[#e94560]" />}
                name="username"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a2e] border border-[#e94560]/30 hover:border-[#e94560] focus:border-[#ff7b54] text-[#f1f1f1] placeholder-[#f1f1f1]/50"
                size="large"
                placeholder="Enter your username"
              />
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <label className="block mb-2 font-medium text-[#f1f1f1]">Role</label>
              <Input
                prefix={<IdcardOutlined className="text-[#e94560]" />}
                name="role"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a2e] border border-[#e94560]/30 hover:border-[#e94560] focus:border-[#ff7b54] text-[#f1f1f1] placeholder-[#f1f1f1]/50"
                size="large"
                placeholder="Your professional role"
              />
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <label className="block mb-2 font-medium text-[#f1f1f1]">Phone</label>
              <Input
                prefix={<PhoneOutlined className="text-[#e94560]" />}
                name="phone"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a2e] border border-[#e94560]/30 hover:border-[#e94560] focus:border-[#ff7b54] text-[#f1f1f1] placeholder-[#f1f1f1]/50"
                size="large"
                placeholder="Contact number"
              />
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <label className="block mb-2 font-medium text-[#f1f1f1]">Address</label>
              <Input
                prefix={<EnvironmentOutlined className="text-[#e94560]" />}
                name="address"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1a2e] border border-[#e94560]/30 hover:border-[#e94560] focus:border-[#ff7b54] text-[#f1f1f1] placeholder-[#f1f1f1]/50"
                size="large"
                placeholder="Your service location"
              />
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <label className="block mb-2 font-medium text-[#f1f1f1]">Profile Picture</label>
              <Upload {...uploadProps}>
                <Button 
                  icon={<UploadOutlined />} 
                  size="large" 
                  block
                  className="rounded-lg bg-[#1a1a2e] border border-[#e94560]/30 hover:border-[#e94560] hover:text-[#ff7b54] text-[#f1f1f1]"
                >
                  Click to Upload
                </Button>
              </Upload>
              {form.profile_picture && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-[#ff7b54] flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {form.profile_picture.name}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                className="h-12 font-semibold text-lg rounded-lg shadow-lg bg-gradient-to-r from-[#e94560] to-[#ff7b54] hover:from-[#ff7b54] hover:to-[#e94560] border-none transition-all duration-300"
              >
                {loading ? "Processing..." : "Complete Registration"}
              </Button>
            </motion.div>
          </form> */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8 rounded-2xl border border-[#e94560]/20 shadow-2xl shadow-[#e94560]/10">
  {/* Username Field - Glow Effect */}
  <motion.div
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ff7b54] to-[#e94560]">
      Username
    </label>
    <Input
      prefix={<UserOutlined className="text-[#ff7b54] group-hover:text-[#e94560] transition-colors" />}
      name="username"
      required
      onChange={handleChange}
      className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#e94560] focus:border-[#ff7b54] focus:ring-2 focus:ring-[#ff7b54]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
      size="large"
      placeholder="Enter your username"
    />
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e94560]/10 to-[#ff7b54]/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
  </motion.div>

  {/* Role Field - Neon Effect */}
  <motion.div
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00dbde] to-[#fc00ff]">
      Role
    </label>
    <Input
      prefix={<IdcardOutlined className="text-[#00dbde] group-hover:text-[#fc00ff] transition-colors" />}
      name="role"
      required
      onChange={handleChange}
      className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#00dbde] focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
      size="large"
      placeholder="Your professional role"
    />
    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00dbde]/20 to-[#fc00ff]/20 blur opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
  </motion.div>

  {/* Phone Field - Cyberpunk Style */}
  <motion.div
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#72f2eb] to-[#00ccff]">
      Phone
    </label>
    <Input
      prefix={<PhoneOutlined className="text-[#72f2eb] group-hover:text-[#00ccff] transition-colors" />}
      name="phone"
      required
      onChange={handleChange}
      className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#72f2eb] focus:border-[#00ccff] focus:ring-2 focus:ring-[#00ccff]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
      size="large"
      placeholder="Contact number"
    />
    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#72f2eb] to-[#00ccff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>

  {/* Address Field - Holographic Effect */}
  <motion.div
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb]">
      Address
    </label>
    <Input
      prefix={<EnvironmentOutlined className="text-[#a18cd1] group-hover:text-[#fbc2eb] transition-colors" />}
      name="address"
      required
      onChange={handleChange}
      className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#a18cd1] focus:border-[#fbc2eb] focus:ring-2 focus:ring-[#fbc2eb]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
      size="large"
      placeholder="Your service location"
    />
    <div className="absolute inset-0  pointer-events-none  rounded-xl border-2 border-transparent group-hover:border-[#fbc2eb]/50 transition-all duration-500" />
  </motion.div>

  {/* File Upload - Glitch Effect */}
  <motion.div
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]">
      Profile Picture
    </label>
    <Upload {...uploadProps}>
      <Button 
        icon={<UploadOutlined className="group-hover:animate-pulse" />} 
        size="large" 
        block
        className="rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#ff9a9e] text-[#f1f1f1] hover:text-[#fad0c4] group-hover:shadow-lg group-hover:shadow-[#ff9a9e]/20 transition-all duration-300 h-14"
      >
        <span className="bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] bg-clip-text text-transparent">
          Click to Upload
        </span>
      </Button>
    </Upload>
    {form.profile_picture && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-3 text-sm font-mono flex items-center bg-[#1a1a2e] px-3 py-2 rounded-lg border border-[#ff9a9e]/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#fad0c4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-[#fad0c4] truncate">{form.profile_picture.name}</span>
      </motion.div>
    )}
  </motion.div>

  {/* Submit Button - Liquid Metal Effect */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    className="relative overflow-hidden rounded-xl mt-8"
  >
    <Button
      type="primary"
      htmlType="submit"
      size="large"
      loading={loading}
      block
      className="h-14 font-bold text-lg rounded-xl shadow-xl bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] hover:from-[#00d2ff] hover:to-[#3a7bd5] border-none transition-all duration-500 relative z-10 overflow-hidden"
    >
      <span className="relative z-10 drop-shadow-md">
        {loading ? "Processing..." : "Complete Registration"}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] opacity-0 hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
    </Button>
    <div className="absolute inset-0 bg-[#1a1a2e] rounded-xl -z-10" />
    <div className="absolute -inset-2 bg-gradient-to-r from-[#3a7bd5]/40 to-[#00d2ff]/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </motion.div>
</form>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProviderForm;