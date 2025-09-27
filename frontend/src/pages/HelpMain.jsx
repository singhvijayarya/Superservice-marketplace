// // // import { useState, useEffect } from "react";
// // // import api from "../api";
// // // import Help from "../components/Help"
// // // import "../styles/HelpMain.css"

// // // function HelpMain() {
// // //   const [complian, setComplain] = useState([]);
// // //   const [content, setContent] = useState("");
// // //   const [title, setTitle] = useState("");

// // //   useEffect(() => {
// // //     getNotes();
// // //   }, []);

// // //   const getNotes = () => {
// // //     api
// // //       .get("/api/help/")
// // //       .then((res) => res.data)
// // //       .then((data) => {
// // //         setComplain(data);
// // //         console.log(data);
// // //       })
// // //       .catch((err) => alert(err));
// // //   };

// // //   const removeComplain = (id) => {
// // //     api
// // //       .delete(`/api/help/remove/${id}/`)
// // //       .then((res) => {
// // //         if (res.status === 204) alert("Complain deleted!");
// // //         else alert("failed to delete complain.");
// // //         getNotes();
// // //       })
// // //       .catch((err) => alert(err));
// // //   };
// // //   const CreateComplain = (e) => {
// // //     e.preventDefault();
// // //     api
// // //       .post("/api/help/", { content, title })
// // //       .then((res) => {
// // //         if (res.status == 201) alert("Complain submitted!");
// // //         else alert("Failed to send complain!");
// // //         getNotes();
// // //       })
// // //       .catch((err) => alert(err));
// // //   };

// // //   return (
// // //     <div>
// // //       <div>
// // //         <h2>Previous Helps/Complains</h2>
// // //         {complian.map((help) => (
// // //           <Help help={help} onRemove={removeComplain} key={help.id} />
// // //         ))}
// // //       </div>
// // //       <div>
// // //         <h2>complain Here..</h2>
// // //         <form onSubmit={CreateComplain}>
// // //           <label htmlFor="title">Title:</label>
// // //           <br />
// // //           <input
// // //             type="text"
// // //             id="title"
// // //             name="title"
// // //             required
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             value={title}
// // //           />
// // //           <br />
// // //           <label htmlFor="content">Content:</label>
// // //           <br />
// // //           <textarea
// // //             id="content"
// // //             name="content"
// // //             required
// // //             onChange={(e) => setContent(e.target.value)}
// // //             value={content}
// // //           ></textarea>
// // //           <br />
// // //           <input type="submit" value="Submit"></input>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // export default HelpMain;
// // import { useState, useEffect } from "react";
// // import api from "../api";
// // import Help from "../components/Help";
// // import { Card, Input, Button, Typography } from "antd";
// // import { MessageOutlined, WarningOutlined, SendOutlined } from '@ant-design/icons';
// // import { motion } from "framer-motion";

// // const { Title, Text } = Typography;
// // const { TextArea } = Input;

// // function HelpMain() {
// //   // Your EXACT original state and logic
// //   const [complian, setComplain] = useState([]);
// //   const [content, setContent] = useState("");
// //   const [title, setTitle] = useState("");

// //   useEffect(() => {
// //     getNotes();
// //   }, []);

// //   const getNotes = () => {
// //     api
// //       .get("/api/help/")
// //       .then((res) => res.data)
// //       .then((data) => {
// //         setComplain(data);
// //         console.log(data);
// //       })
// //       .catch((err) => alert(err));
// //   };

// //   const removeComplain = (id) => {
// //     api
// //       .delete(`/api/help/remove/${id}/`)
// //       .then((res) => {
// //         if (res.status === 204) alert("Complain deleted!");
// //         else alert("failed to delete complain.");
// //         getNotes();
// //       })
// //       .catch((err) => alert(err));
// //   };

// //   const CreateComplain = (e) => {
// //     e.preventDefault();
// //     api
// //       .post("/api/help/", { content, title })
// //       .then((res) => {
// //         if (res.status == 201) alert("Complain submitted!");
// //         else alert("Failed to send complain!");
// //         getNotes();
// //       })
// //       .catch((err) => alert(err));
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <motion.div 
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         className="max-w-6xl mx-auto"
// //       >
// //         {/* Header */}
// //         <div className="flex items-center gap-3 mb-8">
// //           <MessageOutlined className="text-blue-600 text-2xl" />
// //           <Title level={2} className="!mb-0">Help & Support Center</Title>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* Complaints List */}
// //           <motion.div 
// //             whileHover={{ y: -2 }}
// //             className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
// //           >
// //             <div className="flex items-center gap-2 mb-6">
// //               <WarningOutlined className="text-orange-500 text-xl" />
// //               <Title level={4} className="!mb-0">Previous Complaints</Title>
// //             </div>

// //             <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
// //               {complian.map((help) => (
// //                 <Help 
// //                   help={help} 
// //                   onRemove={removeComplain} 
// //                   key={help.id} 
// //                 />
// //               ))}
// //             </div>
// //           </motion.div>

// //           {/* Complaint Form */}
// //           <motion.div 
// //             whileHover={{ y: -2 }}
// //             className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
// //           >
// //             <div className="flex items-center gap-2 mb-6">
// //               <SendOutlined className="text-blue-600 text-xl" />
// //               <Title level={4} className="!mb-0">Submit New Complaint</Title>
// //             </div>

// //             <form onSubmit={CreateComplain} className="space-y-4">
// //               <div>
// //                 <Text strong className="block mb-2">Title</Text>
// //                 <Input
// //                   id="title"
// //                   name="title"
// //                   required
// //                   onChange={(e) => setTitle(e.target.value)}
// //                   value={title}
// //                   placeholder="Brief title of your issue"
// //                 />
// //               </div>

// //               <div>
// //                 <Text strong className="block mb-2">Description</Text>
// //                 <TextArea
// //                   id="content"
// //                   name="content"
// //                   required
// //                   rows={6}
// //                   onChange={(e) => setContent(e.target.value)}
// //                   value={content}
// //                   placeholder="Describe your issue in detail..."
// //                 />
// //               </div>

// //               <Button 
// //                 htmlType="submit" 
// //                 type="primary" 
// //                 icon={<SendOutlined />}
// //                 className="w-full bg-blue-600 hover:bg-blue-700 h-10"
// //               >
// //                 Submit Complaint
// //               </Button>
// //             </form>
// //           </motion.div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default HelpMain;
// import { useState, useEffect } from "react";
// import api from "../api";
// import Help from "../components/Help";
// import { Card, Form, Input, Button, Typography, Divider, Alert } from "antd";
// import { MessageOutlined, WarningOutlined, SendOutlined } from '@ant-design/icons';
// import { motion } from "framer-motion";

// const { Title } = Typography;
// const { TextArea } = Input;

// function HelpMain() {
//   // Your existing state and logic remains unchanged
//   const [complian, setComplain] = useState([]);
//   const [content, setContent] = useState("");
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     getNotes();
//   }, []);

//   const getNotes = () => {
//     api
//       .get("/api/help/")
//       .then((res) => res.data)
//       .then((data) => {
//         setComplain(data);
//         console.log(data);
//       })
//       .catch((err) => alert(err));
//   };

//   const removeComplain = (id) => {
//     api
//       .delete(`/api/help/remove/${id}/`)
//       .then((res) => {
//         if (res.status === 204) alert("Complain deleted!");
//         else alert("failed to delete complain.");
//         getNotes();
//       })
//       .catch((err) => alert(err));
//   };

//   const CreateComplain = (e) => {
//     e.preventDefault();
//     api
//       .post("/api/help/", { content, title })
//       .then((res) => {
//         if (res.status == 201) alert("Complain submitted!");
//         else alert("Failed to send complain!");
//         getNotes();
//       })
//       .catch((err) => alert(err));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="max-w-6xl mx-auto"
//       >
//         {/* Header with Ant Design icon */}
//         <div className="flex items-center gap-3 mb-8">
//           <MessageOutlined className="text-white text-2xl" />
//           <Title level={2} className="!text-white !mb-0">Help & Complaints Center</Title>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Complaints List - Glass Card */}
//           <motion.div 
//             whileHover={{ scale: 1.01 }}
//             className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
//           >
//             <div className="flex items-center gap-2 mb-6">
//               <WarningOutlined className="text-white text-xl" />
//               <Title level={4} className="!text-white !mb-0">Previous Complaints</Title>
//             </div>

//             <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
//               {complian.map((help) => (
//                 <Help 
//                   help={help} 
//                   onRemove={removeComplain} 
//                   key={help.id} 
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Complaint Form - Glass Card */}
//           <motion.div 
//             whileHover={{ scale: 1.01 }}
//             className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
//           >
//             <div className="flex items-center gap-2 mb-6">
//               <SendOutlined className="text-white text-xl" />
//               <Title level={4} className="!text-white !mb-0">Submit Complaint</Title>
//             </div>

//             {/* Your original form with enhanced styling */}
//             <form onSubmit={CreateComplain} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-white/80 mb-2">
//                   Title
//                 </label>
//                 <Input
//                   id="title"
//                   name="title"
//                   required
//                   onChange={(e) => setTitle(e.target.value)}
//                   value={title}
//                   className="bg-white/10 border-white/20 hover:border-white/40 text-white"
//                   placeholder="Enter complaint title"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/80 mb-2">
//                   Content
//                 </label>
//                 <TextArea
//                   id="content"
//                   name="content"
//                   required
//                   rows={6}
//                   onChange={(e) => setContent(e.target.value)}
//                   value={content}
//                   className="bg-white/10 border-white/20 hover:border-white/40 text-white"
//                   placeholder="Describe your issue..."
//                 />
//               </div>

//               <Button 
//                 htmlType="submit" 
//                 type="primary" 
//                 icon={<SendOutlined />}
//                 className="w-full bg-blue-600 hover:bg-blue-700 border-none"
//               >
//                 Submit
//               </Button>
//             </form>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default HelpMain;

import { useState, useEffect } from "react";
import api from "../api";
import Help from "../components/Help";
import { Card, Form, Input, Button, Typography, Divider, Alert } from "antd";
import { MessageOutlined, WarningOutlined, SendOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";

const { Title } = Typography;
const { TextArea } = Input;

function HelpMain() {
  // Your existing state and logic remains unchanged
  const [complian, setComplain] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/help/")
      .then((res) => res.data)
      .then((data) => {
        setComplain(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const removeComplain = (id) => {
    api
      .delete(`/api/help/remove/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Complain deleted!");
        else alert("failed to delete complain.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const CreateComplain = (e) => {
    e.preventDefault();
    api
      .post("/api/help/", { content, title })
      .then((res) => {
        if (res.status == 201) alert("Complain submitted!");
        else alert("Failed to send complain!");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="min-h-screen bg-[#0a192f] p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header with Ant Design icon */}
        <div className="flex items-center gap-3 mb-8">
          <MessageOutlined className="text-white text-2xl" />
          <Title level={2} className="!text-white !mb-0">Help & Complaints Center</Title>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complaints List - Professional Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#172a45] rounded-xl p-6 border border-[#303f60] shadow-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <WarningOutlined className="text-white text-xl" />
              <Title level={4} className="!text-white !mb-0">Previous Complaints</Title>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {complian.map((help) => (
                <Help 
                  help={help} 
                  onRemove={removeComplain} 
                  key={help.id} 
                />
              ))}
            </div>
          </motion.div>

          {/* Complaint Form - Professional Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#172a45] rounded-xl p-6 border border-[#303f60] shadow-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <SendOutlined className="text-white text-xl" />
              <Title level={4} className="!text-white !mb-0">Submit Complaint</Title>
            </div>

            {/* Your original form with enhanced styling */}
            <form onSubmit={CreateComplain} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="bg-[#0a192f] border-[#303f60] hover:border-[#64ffda] text-white"
                  placeholder="Enter complaint title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Content
                </label>
                <TextArea
                  id="content"
                  name="content"
                  required
                  rows={6}
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="bg-[#0a192f] border-[#303f60] hover:border-[#64ffda] text-white"
                  placeholder="Describe your issue..."
                />
              </div>

              <Button 
                htmlType="submit" 
                type="primary" 
                icon={<SendOutlined />}
                className="w-full bg-[#0a7bff] hover:bg-[#0062cc] border-none"
              >
                Submit
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default HelpMain;