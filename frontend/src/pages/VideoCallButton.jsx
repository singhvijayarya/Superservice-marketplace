// import React, { useState } from 'react';
// import { Button, Modal, message } from 'antd';
// import { VideoCameraOutlined } from '@ant-design/icons';
// import VideoCallRoom from './VideoCallRoom';
// import axios from 'axios';
// import api  from '../api'; // Import your configured axios instance

// const VideoCallButton = ({ providerUsername }) => {
//   const [callData, setCallData] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const initiateCall = async () => {
//     try {
//       const { data } = await api.post('/api/initiate-call/', {
//         provider_username: providerUsername
//       });
      
//       setCallData({
//         ...data,
//         providerUsername,
//         status: 'initiating'
//       });
//       setIsModalVisible(true);
//     } catch (err) {
//       message.error('Failed to initiate call');
//     }
//   };

//   return (
//     <>
//       <Button 
//         type="primary" 
//         icon={<VideoCameraOutlined />}
//         onClick={initiateCall}
//         className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all"
//       >
//         Start Video Call
//       </Button>

//       <Modal
//         title={
//           <div className="flex items-center">
//             <VideoCameraOutlined className="mr-2 text-blue-500" />
//             <span className="font-semibold">Calling {providerUsername}</span>
//           </div>
//         }
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//         width={900}
//         className="video-call-modal"
//         bodyStyle={{ padding: 0 }}
//       >
//         {callData && (
//           <VideoCallRoom 
//             callData={callData}
//             onEndCall={() => setIsModalVisible(false)}
//           />
//         )}
//       </Modal>
//     </>
//   );
// };
// export default VideoCallButton;

import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import VideoCallRoom from './VideoCallRoom';
import api from '../api';

const VideoCallButton = ({ providerUsername }) => {
  const [callData, setCallData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initiateCall = async () => {
    try {
      const { data } = await api.post('/api/initiate-call/', {
        provider_username: providerUsername
      });
      
      setCallData({
        ...data,
        providerUsername,
        status: 'initiating'
      });
      setIsModalVisible(true);
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to initiate call');
      console.error('Call initiation error:', err);
    }
  };

  return (
    <>
      <Button 
        type="primary" 
        icon={<VideoCameraOutlined />}
        onClick={initiateCall}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Start Video Call
      </Button>

      <Modal
        title={
          <div className="flex items-center">
            <VideoCameraOutlined className="mr-2 text-blue-500" />
            <span className="font-semibold">Calling {providerUsername}</span>
          </div>
        }
        open={isModalVisible}  // Fixed: Replaced visible with open
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={900}
        className="video-call-modal"
        styles={{ body: { padding: 0 } }}  // Fixed: Replaced bodyStyle with styles
        destroyOnClose
      >
        {callData && (
          <VideoCallRoom 
            callData={callData}
            onEndCall={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
    </>
  );
};
export default VideoCallButton;