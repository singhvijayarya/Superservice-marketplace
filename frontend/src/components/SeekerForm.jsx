// import React, { useState } from "react";
// import axios from "axios";
// import { ACCESS_TOKEN } from "../constants";

// const SeekerForm = () => {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
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
//       const res = await axios.post("http://localhost:8001/api/seeker-form/", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }); 
//       alert("Seeker registered!");
//       localStorage.setItem("role", "seeker");
//       localStorage.setItem("profilePic", res.data.profile_picture); // ✅ actual image URL from backend
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
//         <h2 className="text-3xl font-bold mb-6 text-center">Seeker Registration</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input name="username" required onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input name="email" type="email" required onChange={handleChange} className="w-full p-2 border rounded" />
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
//           <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SeekerForm;
import React, { useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { motion } from "framer-motion";
import { Input, Button, Upload, message, Form } from "antd";
import { UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

const SeekerForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await axios.post("http://localhost:8001/api/seeker-form/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      message.success("Profile created successfully!");
      localStorage.setItem("role", "seeker");
      localStorage.setItem("profilePic", res.data.profile_picture);
      window.location.href = "/";
    } catch (err) {
      console.error("Error response:", err.response?.data);
      setError(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        "Something went wrong."
      );
      message.error("Submission failed. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-md border border-white/20"
//       >
//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-center mb-8"
//         >
//           <h2 className="text-2xl font-semibold text-white">Complete Your Profile</h2>
//           <p className="text-slate-300 mt-2">Fill in your details to get started</p>
//         </motion.div>
        
//         {error && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-3 bg-rose-600/90 text-white rounded-lg text-sm"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* <motion.form 
//           onSubmit={handleSubmit} 
//           className="space-y-5"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div variants={itemVariants}>
//             <Form.Item
//               label={<span className="text-slate-300 font-medium">Username</span>}
//               className="mb-0"
//             >
//               <Input
//                 name="username"
//                 required
//                 onChange={handleChange}
//                 prefix={<UserOutlined className="text-slate-400" />}
//                 className="w-full bg-white/5 border-slate-600 hover:border-slate-500 focus:border-slate-400 text-white placeholder-slate-400"
//                 placeholder="john_doe"
//               />
//             </Form.Item>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <Form.Item
//               label={<span className="text-slate-300 font-medium">Email</span>}
//               className="mb-0"
//             >
//               <Input
//                 name="email"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 prefix={<MailOutlined className="text-slate-400" />}
//                 className="w-full bg-white/5 border-slate-600 hover:border-slate-500 focus:border-slate-400 text-white placeholder-slate-400"
//                 placeholder="john@example.com"
//               />
//             </Form.Item>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <Form.Item
//               label={<span className="text-slate-300 font-medium">Phone</span>}
//               className="mb-0"
//             >
//               <Input
//                 name="phone"
//                 required
//                 onChange={handleChange}
//                 prefix={<PhoneOutlined className="text-slate-400" />}
//                 className="w-full bg-white/5 border-slate-600 hover:border-slate-500 focus:border-slate-400 text-white placeholder-slate-400"
//                 placeholder="+1 234 567 890"
//               />
//             </Form.Item>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <Form.Item
//               label={<span className="text-slate-300 font-medium">Address</span>}
//               className="mb-0"
//             >
//               <Input
//                 name="address"
//                 required
//                 onChange={handleChange}
//                 prefix={<HomeOutlined className="text-slate-400" />}
//                 className="w-full bg-white/5 border-slate-600 hover:border-slate-500 focus:border-slate-400 text-white placeholder-slate-400"
//                 placeholder="123 Main St, City"
//               />
//             </Form.Item>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <Form.Item
//               label={<span className="text-slate-300 font-medium">Profile Photo</span>}
//               className="mb-0"
//             >
//               <Upload
//                 name="profile_picture"
//                 accept="image/*"
//                 beforeUpload={(file) => {
//                   setForm({ ...form, profile_picture: file });
//                   return false;
//                 }}
//                 showUploadList={false}
//               >
//                 <Button 
//                   icon={<UploadOutlined className="text-slate-400" />}
//                   className="w-full bg-white/5 border-slate-600 hover:bg-white/10 text-slate-300 hover:text-white hover:border-slate-500"
//                 >
//                   Upload Image
//                 </Button>
//               </Upload>
//             </Form.Item>
//           </motion.div>

//           <motion.div 
//             variants={itemVariants}
//             className="pt-2"
//           >
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={isSubmitting}
//               className="w-full h-10 rounded-md bg-blue-600 hover:bg-blue-700 border-none text-white font-medium shadow-sm hover:shadow-md transition-all"
//               size="large"
//             >
//               {isSubmitting ? 'Saving...' : 'Complete Registration'}
//             </Button>
//           </motion.div>
//         </motion.form> */}
//         <motion.form 
//   onSubmit={handleSubmit} 
//   className="space-y-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8 rounded-2xl border border-[#e94560]/20 shadow-2xl shadow-[#e94560]/10"
//   variants={containerVariants}
//   initial="hidden"
//   animate="visible"
// >
//   {/* Username Field - Glow Effect */}
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ x: 5 }}
//     whileTap={{ scale: 0.98 }}
//     className="relative group"
//   >
//     <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ff7b54] to-[#e94560]">
//       Username
//     </label>
//     <Input
//       prefix={<UserOutlined className="text-[#ff7b54] group-hover:text-[#e94560] transition-colors" />}
//       name="username"
//       required
//       onChange={handleChange}
//       className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#e94560] focus:border-[#ff7b54] focus:ring-2 focus:ring-[#ff7b54]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
//       size="large"
//       placeholder="Enter your username"
//     />
//     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e94560]/10 to-[#ff7b54]/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
//   </motion.div>

//   {/* Email Field - Neon Effect */}
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ x: 5 }}
//     whileTap={{ scale: 0.98 }}
//     className="relative group"
//   >
//     <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00dbde] to-[#fc00ff]">
//       Email
//     </label>
//     <Input
//       prefix={<MailOutlined className="text-[#00dbde] group-hover:text-[#fc00ff] transition-colors" />}
//       name="email"
//       type="email"
//       required
//       onChange={handleChange}
//       className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#00dbde] focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
//       size="large"
//       placeholder="your.email@example.com"
//     />
//     <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00dbde]/20 to-[#fc00ff]/20 blur opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
//   </motion.div>

//   {/* Phone Field - Cyberpunk Style */}
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ x: 5 }}
//     whileTap={{ scale: 0.98 }}
//     className="relative group"
//   >
//     <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#72f2eb] to-[#00ccff]">
//       Phone
//     </label>
//     <Input
//       prefix={<PhoneOutlined className="text-[#72f2eb] group-hover:text-[#00ccff] transition-colors" />}
//       name="phone"
//       required
//       onChange={handleChange}
//       className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#72f2eb] focus:border-[#00ccff] focus:ring-2 focus:ring-[#00ccff]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
//       size="large"
//       placeholder="+1 234 567 890"
//     />
//     <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#72f2eb] to-[#00ccff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//   </motion.div>

//   {/* Address Field - Holographic Effect */}
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ x: 5 }}
//     whileTap={{ scale: 0.98 }}
//     className="relative group"
//   >
//     <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb]">
//       Address
//     </label>
//     <Input
//       prefix={<HomeOutlined className="text-[#a18cd1] group-hover:text-[#fbc2eb] transition-colors" />}
//       name="address"
//       required
//       onChange={handleChange}
//       className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#a18cd1] focus:border-[#fbc2eb] focus:ring-2 focus:ring-[#fbc2eb]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
//       size="large"
//       placeholder="123 Main St, City"
//     />
//     <div className="absolute inset-0  pointer-events-none  rounded-xl border-2 border-transparent group-hover:border-[#fbc2eb]/50 transition-all duration-500" />
//   </motion.div>

//   {/* Profile Picture Upload - Glitch Effect */}
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ x: 5 }}
//     whileTap={{ scale: 0.98 }}
//     className="relative group"
//   >
//     <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]">
//       Profile Picture
//     </label>
//     <Upload
//       name="profile_picture"
//       accept="image/*"
//       beforeUpload={(file) => {
//         setForm({ ...form, profile_picture: file });
//         return false;
//       }}
//       showUploadList={false}
//     >
//       <Button 
//         icon={<UploadOutlined className="group-hover:animate-pulse" />} 
//         size="large" 
//         block
//         className="rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#ff9a9e] text-[#f1f1f1] hover:text-[#fad0c4] group-hover:shadow-lg group-hover:shadow-[#ff9a9e]/20 transition-all duration-300 h-14"
//       >
//         <span className="bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] bg-clip-text text-transparent">
//           Click to Upload
//         </span>
//       </Button>
//     </Upload>
//     {form.profile_picture && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="mt-3 text-sm font-mono flex items-center bg-[#1a1a2e] px-3 py-2 rounded-lg border border-[#ff9a9e]/20"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#fad0c4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//         </svg>
//         <span className="text-[#fad0c4] truncate">{form.profile_picture.name}</span>
//       </motion.div>
//     )}
//   </motion.div>

//   {/* Submit Button - Liquid Metal Effect */}
//   <motion.div
//     variants={itemVariants}
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.95 }}
//     className="relative overflow-hidden rounded-xl mt-8"
//   >
//     <Button
//       type="primary"
//       htmlType="submit"
//       size="large"
//       loading={isSubmitting}
//       block
//       className="h-14 font-bold text-lg rounded-xl shadow-xl bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] hover:from-[#00d2ff] hover:to-[#3a7bd5] border-none transition-all duration-500 relative z-10 overflow-hidden"
//     >
//       <span className="relative z-10 drop-shadow-md">
//         {isSubmitting ? "Processing..." : "Complete Registration"}
//       </span>
//       <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] opacity-0 hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
//     </Button>
//     <div className="absolute inset-0 bg-[#1a1a2e] rounded-xl -z-10" />
//     <div className="absolute -inset-2 bg-gradient-to-r from-[#3a7bd5]/40 to-[#00d2ff]/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//   </motion.div>
// </motion.form>
//       </motion.div>
//     </div>



<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-2xl border border-white/20" // Changed max-w-md to max-w-2xl
  >
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center mb-8"
    >
      <h2 className="text-2xl font-semibold text-white">Complete Your Profile</h2>
      <p className="text-slate-300 mt-2">Fill in your details to get started</p>
    </motion.div>
    
    {error && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 p-3 bg-rose-600/90 text-white rounded-lg text-sm"
      >
        {error}
      </motion.div>
    )}

    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8 rounded-2xl border border-[#e94560]/20 shadow-2xl shadow-[#e94560]/10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%' }} // Ensure form takes full width of container
    >
      {/* Username Field - Glow Effect */}
      <motion.div
        variants={itemVariants}
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

      {/* Email Field - Neon Effect */}
      <motion.div
        variants={itemVariants}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group"
      >
        <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00dbde] to-[#fc00ff]">
          Email
        </label>
        <Input
          prefix={<MailOutlined className="text-[#00dbde] group-hover:text-[#fc00ff] transition-colors" />}
          name="email"
          type="email"
          required
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#00dbde] focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
          size="large"
          placeholder="your.email@example.com"
        />
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00dbde]/20 to-[#fc00ff]/20 blur opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
      </motion.div>

      {/* Phone Field - Cyberpunk Style */}
      <motion.div
        variants={itemVariants}
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
          placeholder="+1 234 567 890"
        />
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#72f2eb] to-[#00ccff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Address Field - Holographic Effect */}
      <motion.div
        variants={itemVariants}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group"
      >
        <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb]">
          Address
        </label>
        <Input
          prefix={<HomeOutlined className="text-[#a18cd1] group-hover:text-[#fbc2eb] transition-colors" />}
          name="address"
          required
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border-2 border-[#302b63] hover:border-[#a18cd1] focus:border-[#fbc2eb] focus:ring-2 focus:ring-[#fbc2eb]/30 text-[#f1f1f1] placeholder-[#f1f1f1]/50 transition-all duration-300"
          size="large"
          placeholder="123 Main St, City"
        />
        <div className="absolute inset-0  pointer-events-none  rounded-xl border-2 border-transparent group-hover:border-[#fbc2eb]/50 transition-all duration-500" />
      </motion.div>

      {/* Profile Picture Upload - Glitch Effect */}
      <motion.div
        variants={itemVariants}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group"
      >
        <label className="block mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]">
          Profile Picture
        </label>
        <Upload
          name="profile_picture"
          accept="image/*"
          beforeUpload={(file) => {
            setForm({ ...form, profile_picture: file });
            return false;
          }}
          showUploadList={false}
        >
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
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden rounded-xl mt-8"
      >
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isSubmitting}
          block
          className="h-14 font-bold text-lg rounded-xl shadow-xl bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] hover:from-[#00d2ff] hover:to-[#3a7bd5] border-none transition-all duration-500 relative z-10 overflow-hidden"
        >
          <span className="relative z-10 drop-shadow-md">
            {isSubmitting ? "Processing..." : "Complete Registration"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] opacity-0 hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        </Button>
        <div className="absolute inset-0 bg-[#1a1a2e] rounded-xl -z-10" />
        <div className="absolute -inset-2 bg-gradient-to-r from-[#3a7bd5]/40 to-[#00d2ff]/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>
    </motion.form>
  </motion.div>
</div>
  );
};

export default SeekerForm;