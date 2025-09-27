// import React, { useEffect, useState } from 'react';
// import { List, Avatar, Tag, Badge, Button } from 'antd';
// import { VideoCameraOutlined, UserOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import  api  from '../api'; // Import your configured axios instance

// const CallNotifications = ({ calls }) => {
//   const [unseenCalls, setUnseenCalls] = useState([]);

//   useEffect(() => {
//     setUnseenCalls(calls.filter(call => !call.seen).map(call => call.id));
//   }, [calls]);

//   const markAsSeen = async (ids) => {
//     try {
//       await api.post('/api/mark-seen/', { notification_ids: ids });
//       setUnseenCalls(unseenCalls.filter(id => !ids.includes(id)));
//     } catch (err) {
//       console.error('Error marking as seen:', err);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//           <VideoCameraOutlined className="mr-3 text-blue-500 text-xl" />
//           Call History
//         </h2>
//         {unseenCalls.length > 0 && (
//           <Button 
//             type="link" 
//             className="text-blue-500"
//             onClick={() => markAsSeen(unseenCalls)}
//           >
//             Mark all as read
//           </Button>
//         )}
//       </div>

//       <List
//         itemLayout="horizontal"
//         dataSource={calls}
//         renderItem={(call) => (
//           <List.Item 
//             className={`p-4 hover:bg-blue-50 transition-colors rounded-lg ${
//               !call.seen ? 'bg-blue-50 border-l-4 border-blue-500' : ''
//             }`}
//           >
//             <List.Item.Meta
//               avatar={
//                 <Avatar 
//                   src={call.profile_picture} 
//                   size="large"
//                   icon={<UserOutlined />}
//                   className="border-2 border-blue-200"
//                 />
//               }
//               title={
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-gray-800">{call.seeker_username}</span>
//                   <Tag 
//                     color={call.answered ? 'green' : 'orange'} 
//                     className="rounded-full px-3 py-1"
//                   >
//                     {call.answered ? 'Answered' : 'Missed'}
//                   </Tag>
//                 </div>
//               }
//               description={
//                 <div className="flex justify-between items-center text-gray-500">
//                   <span>{new Date(call.timestamp).toLocaleString()}</span>
//                   {!call.seen && <Badge dot className="ml-2" />}
//                 </div>
//               }
//             />
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };
// export default CallNotifications;

import React, { useEffect, useState } from 'react';
import { List, Avatar, Tag, Badge, Button, message } from 'antd';
import { VideoCameraOutlined, UserOutlined } from '@ant-design/icons';
import api from '../api';

const CallNotifications = ({ calls }) => {
  const [unseenCalls, setUnseenCalls] = useState([]);

  useEffect(() => {
    setUnseenCalls(calls.filter(call => !call.seen).map(call => call.id));
  }, [calls]);

  const markAsSeen = async (ids) => {
    try {
      await api.post('/api/mark-seen/', { notification_ids: ids });
      setUnseenCalls(prev => prev.filter(id => !ids.includes(id)));
      message.success('Marked as read');
    } catch (err) {
      console.error('Error marking as seen:', err);
      message.error(err.response?.data?.message || 'Failed to mark as read');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <VideoCameraOutlined className="mr-3 text-blue-500 text-xl" />
          Call History
        </h2>
        {unseenCalls.length > 0 && (
          <Button 
            type="link" 
            className="text-blue-500"
            onClick={() => markAsSeen(unseenCalls)}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <List
        itemLayout="horizontal"
        dataSource={calls}
        renderItem={(call) => (
          <List.Item
            key={call.id}  // Added key prop
            className={`p-4 hover:bg-blue-50 transition-colors rounded-lg ${
              !call.seen ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
          >
            <List.Item.Meta
              avatar={
                <Avatar 
                  src={call.profile_picture} 
                  size="large"
                  icon={<UserOutlined />}
                  className="border-2 border-blue-200"
                />
              }
              title={
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{call.seeker_username}</span>
                  <Tag 
                    color={call.answered ? 'green' : 'orange'} 
                    className="rounded-full px-3 py-1"
                  >
                    {call.answered ? 'Answered' : 'Missed'}
                  </Tag>
                </div>
              }
              description={
                <div className="flex justify-between items-center text-gray-500">
                  <span>{new Date(call.timestamp).toLocaleString()}</span>
                  {!call.seen && <Badge dot className="ml-2" />}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default CallNotifications;