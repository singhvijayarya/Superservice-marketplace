// // import React, { useState, useEffect, useRef } from 'react';
// // import { Button, Space, Modal } from 'antd';
// // import { 
// //   AudioOutlined, 
// //   AudioMutedOutlined, 
// //   VideoCameraOutlined, 
// //   VideoCameraAddOutlined,
// //   PhoneOutlined 
// // } from '@ant-design/icons';

// // const VideoCallModal = ({ visible, onCancel, providerUsername }) => {
// //   const [callStatus, setCallStatus] = useState('connecting');
// //   const [isMuted, setIsMuted] = useState(false);
// //   const [isCameraOff, setIsCameraOff] = useState(false);
// //   const localVideoRef = useRef(null);
// //   const remoteVideoRef = useRef(null);

// //   useEffect(() => {
// //     if (!visible) return;

// //     // Simulate call connection
// //     const timer = setTimeout(() => {
// //       setCallStatus('connected');
// //       setupMedia();
// //     }, 1500);

// //     return () => clearTimeout(timer);
// //   }, [visible]);

// //   const setupMedia = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ 
// //         audio: true, 
// //         video: true 
// //       });
// //       if (localVideoRef.current) {
// //         localVideoRef.current.srcObject = stream;
// //       }
// //     } catch (err) {
// //       console.error("Error accessing media devices:", err);
// //     }
// //   };

// //   const toggleMute = () => {
// //     setIsMuted(!isMuted);
// //     // Actual mute implementation would go here
// //   };

// //   const toggleCamera = () => {
// //     setIsCameraOff(!isCameraOff);
// //     // Actual camera toggle would go here
// //   };

// //   const endCall = () => {
// //     if (localVideoRef.current?.srcObject) {
// //       localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
// //     }
// //     onCancel();
// //   };

// //   return (
// //     <Modal
// //       title={`Calling ${providerUsername}`}
// //       visible={visible}
// //       onCancel={endCall}
// //       footer={null}
// //       width={800}
// //       className="video-call-modal"
// //       bodyStyle={{ padding: 0 }}
// //     >
// //       <div className="relative h-[500px] bg-gray-900 rounded-lg overflow-hidden">
// //         {/* Remote Video */}
// //         {callStatus === 'connected' ? (
// //           <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// //             <video 
// //               ref={remoteVideoRef}
// //               autoPlay
// //               playsInline
// //               className="absolute inset-0 w-full h-full object-cover"
// //             />
// //             <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
// //               {providerUsername}
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             <div className="text-white text-lg">
// //               {callStatus === 'connecting' ? 'Connecting...' : 'Call ended'}
// //             </div>
// //           </div>
// //         )}

// //         {/* Local Video */}
// //         {callStatus === 'connected' && (
// //           <div className="absolute bottom-20 right-4 w-40 h-30 bg-black rounded-lg overflow-hidden border-2 border-white">
// //             <video
// //               ref={localVideoRef}
// //               autoPlay
// //               playsInline
// //               muted
// //               className="w-full h-full object-cover"
// //             />
// //           </div>
// //         )}

// //         {/* Controls */}
// //         <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex justify-center">
// //           <Space size="large">
// //             <Button
// //               shape="circle"
// //               size="large"
// //               icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
// //               onClick={toggleMute}
// //               className={`${isMuted ? 'bg-red-500' : 'bg-white'}`}
// //             />
// //             <Button
// //               shape="circle"
// //               size="large"
// //               icon={isCameraOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
// //               onClick={toggleCamera}
// //               className={`${isCameraOff ? 'bg-red-500' : 'bg-white'}`}
// //             />
// //             <Button
// //               type="primary"
// //               danger
// //               shape="circle"
// //               size="large"
// //               icon={<PhoneOutlined />}
// //               onClick={endCall}
// //             />
// //           </Space>
// //         </div>
// //       </div>
// //     </Modal>
// //   );
// // };
// // export default VideoCallModal;
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Button, Space } from 'antd';
// // import { 
// //   AudioOutlined, 
// //   AudioMutedOutlined, 
// //   VideoCameraOutlined, 
// //   VideoCameraAddOutlined,
// //   PhoneOutlined 
// // } from '@ant-design/icons';

// // const VideoCallRoom = ({ callData, onEndCall }) => {
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStream, setRemoteStream] = useState(null);
// //   const [isMuted, setIsMuted] = useState(false);
// //   const [isCameraOff, setIsCameraOff] = useState(false);
// //   const [callStatus, setCallStatus] = useState(callData.status);
// //   const localVideoRef = useRef();
// //   const remoteVideoRef = useRef();

// //   useEffect(() => {
// //     const setupCall = async () => {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           audio: true,
// //           video: true
// //         });
// //         setLocalStream(stream);
// //         localVideoRef.current.srcObject = stream;
// //         setCallStatus('ringing');
        
// //         // Simulate call connection
// //         setTimeout(() => {
// //           setCallStatus('connected');
// //         }, 2000);
// //       } catch (err) {
// //         console.error('Error setting up call:', err);
// //         onEndCall();
// //       }
// //     };

// //     setupCall();

// //     return () => {
// //       if (localStream) {
// //         localStream.getTracks().forEach(track => track.stop());
// //       }
// //     };
// //   }, []);

// //   const toggleMute = () => {
// //     localStream.getAudioTracks().forEach(track => {
// //       track.enabled = !track.enabled;
// //     });
// //     setIsMuted(!isMuted);
// //   };

// //   const toggleCamera = () => {
// //     localStream.getVideoTracks().forEach(track => {
// //       track.enabled = !track.enabled;
// //     });
// //     setIsCameraOff(!isCameraOff);
// //   };

// //   return (
// //     <div className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden">
// //       {/* Remote Video */}
// //       {callStatus === 'connected' ? (
// //         <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// //           <video 
// //             ref={remoteVideoRef}
// //             autoPlay
// //             playsInline
// //             className="absolute inset-0 w-full h-full object-cover"
// //           />
// //           <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center">
// //             <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
// //             <span className="font-medium">{callData.providerUsername}</span>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
// //           <div className="w-32 h-32 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6">
// //             <VideoCameraOutlined className="text-white text-4xl" />
// //           </div>
// //           <div className="text-white text-2xl font-medium mb-2">
// //             {callStatus === 'ringing' ? 'Ringing...' : 'Connecting...'}
// //           </div>
// //           <div className="text-gray-300">
// //             Calling {callData.providerUsername}
// //           </div>
// //         </div>
// //       )}

// //       {/* Local Video */}
// //       {callStatus === 'connected' && (
// //         <div className={`absolute bottom-24 right-6 w-48 h-36 rounded-xl overflow-hidden border-2 ${
// //           isCameraOff ? 'border-red-500' : 'border-white'
// //         } transition-all`}>
// //           <video
// //             ref={localVideoRef}
// //             autoPlay
// //             playsInline
// //             muted
// //             className="w-full h-full object-cover"
// //           />
// //           {isCameraOff && (
// //             <div className="absolute inset-0 bg-black flex items-center justify-center">
// //               <VideoCameraAddOutlined className="text-white text-xl" />
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Controls */}
// //       <div className="absolute bottom-6 left-0 right-0 flex justify-center">
// //         <div className="bg-black bg-opacity-60 rounded-full px-6 py-3 flex items-center">
// //           <Space size="large">
// //             <Button
// //               shape="circle"
// //               size="large"
// //               icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
// //               onClick={toggleMute}
// //               className={`${isMuted ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
// //             />
// //             <Button
// //               shape="circle"
// //               size="large"
// //               icon={isCameraOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
// //               onClick={toggleCamera}
// //               className={`${isCameraOff ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
// //             />
// //             <Button
// //               type="primary"
// //               danger
// //               shape="circle"
// //               size="large"
// //               icon={<PhoneOutlined />}
// //               onClick={onEndCall}
// //               className="h-12 w-12 flex items-center justify-center"
// //             />
// //           </Space>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default VideoCallRoom;
// // ================================================================================

// // import React, { useState, useEffect, useRef } from 'react';
// // import { Button, Space, message } from 'antd';
// // import { 
// //   AudioOutlined, 
// //   AudioMutedOutlined, 
// //   VideoCameraOutlined, 
// //   VideoCameraAddOutlined,
// //   PhoneOutlined 
// // } from '@ant-design/icons';

// // const VideoCallRoom = ({ callData, onEndCall }) => {
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStream, setRemoteStream] = useState(null);
// //   const [isMuted, setIsMuted] = useState(false);
// //   const [isCameraOff, setIsCameraOff] = useState(false);
// //   const [callStatus, setCallStatus] = useState(callData.status);
// //   const [socket, setSocket] = useState(null);
// //   const [peerConnection, setPeerConnection] = useState(null);
// //   const localVideoRef = useRef();
// //   const remoteVideoRef = useRef();

// //   useEffect(() => {
// //     const setupCall = async () => {
// //       try {
// //         // 1. Get user media
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           audio: true,
// //           video: true
// //         });
// //         setLocalStream(stream);
// //         localVideoRef.current.srcObject = stream;
        
// //         // 2. Create WebSocket connection
// //         const ws = new WebSocket(
// //           `ws://${window.location.host}/ws/video-call/`
// //         );
// //         setSocket(ws);

// //         // 3. Create peer connection
// //         const pc = new RTCPeerConnection({
// //           iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
// //         });
// //         setPeerConnection(pc);

// //         // Add local stream to connection
// //         stream.getTracks().forEach(track => {
// //           pc.addTrack(track, stream);
// //         });

// //         // Handle remote stream
// //         pc.ontrack = (event) => {
// //           setRemoteStream(event.streams[0]);
// //           remoteVideoRef.current.srcObject = event.streams[0];
// //         };

// //         // ICE candidate handling
// //         pc.onicecandidate = (event) => {
// //           if (event.candidate) {
// //             ws.send(JSON.stringify({
// //               action: 'ice_candidate',
// //               candidate: event.candidate,
// //               call_id: callData.callId
// //             }));
// //           }
// //         };

// //         // WebSocket message handling
// //         ws.onmessage = async (event) => {
// //           const data = JSON.parse(event.data);
          
// //           if (data.action === 'offer') {
// //             await pc.setRemoteDescription(new RTCSessionDescription(data));
// //             const answer = await pc.createAnswer();
// //             await pc.setLocalDescription(answer);
// //             ws.send(JSON.stringify({
// //               action: 'answer',
// //               answer: answer,
// //               call_id: callData.callId
// //             }));
// //           } 
// //           else if (data.action === 'answer') {
// //             await pc.setRemoteDescription(new RTCSessionDescription(data));
// //           }
// //           else if (data.action === 'ice_candidate') {
// //             await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
// //           }
// //           else if (data.action === 'call_accepted') {
// //             setCallStatus('connected');
// //           }
// //           else if (data.action === 'call_rejected') {
// //             message.error('Call rejected by provider');
// //             onEndCall();
// //           }
// //         };

// //         // Send call initiation
// //         if (callData.status === 'initiating') {
// //           ws.send(JSON.stringify({
// //             action: 'initiate_call',
// //             provider_username: callData.providerUsername,
// //             call_id: callData.callId
// //           }));
// //           setCallStatus('ringing');
// //         }

// //       } catch (err) {
// //         console.error('Error setting up call:', err);
// //         message.error('Failed to start call');
// //         onEndCall();
// //       }
// //     };

// //     setupCall();

// //     return () => {
// //       if (localStream) {
// //         localStream.getTracks().forEach(track => track.stop());
// //       }
// //       if (socket) {
// //         socket.close();
// //       }
// //       if (peerConnection) {
// //         peerConnection.close();
// //       }
// //     };
// //   }, []);

// //   const toggleMute = () => {
// //     if (localStream) {
// //       localStream.getAudioTracks().forEach(track => {
// //         track.enabled = !track.enabled;
// //       });
// //       setIsMuted(!isMuted);
// //     }
// //   };

// //   const toggleCamera = () => {
// //     if (localStream) {
// //       localStream.getVideoTracks().forEach(track => {
// //         track.enabled = !track.enabled;
// //       });
// //       setIsCameraOff(!isCameraOff);
// //     }
// //   };

// //   const endCall = () => {
// //     if (socket) {
// //       socket.send(JSON.stringify({
// //         action: 'end_call',
// //         call_id: callData.callId
// //       }));
// //     }
// //     onEndCall();
// //   };

// //   return (
// //     <div className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden">
// //       {/* Remote Video */}
// //       {callStatus === 'connected' ? (
// //         <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// //           <video 
// //             ref={remoteVideoRef}
// //             autoPlay
// //             playsInline
// //             className="absolute inset-0 w-full h-full object-cover"
// //           />
// //           <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center">
// //             <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
// //             <span className="font-medium">{callData.providerUsername}</span>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
// //           <div className="w-32 h-32 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6">
// //             <VideoCameraOutlined className="text-white text-4xl" />
// //           </div>
// //           <div className="text-white text-2xl font-medium mb-2">
// //             {callStatus === 'ringing' ? 'Ringing...' : 'Connecting...'}
// //           </div>
// //           <div className="text-gray-300">
// //             Calling {callData.providerUsername}
// //           </div>
// //         </div>
// //       )}

// //       {/* Local Video */}
// //       {callStatus === 'connected' && (
// //         <div className={`absolute bottom-24 right-6 w-48 h-36 rounded-xl overflow-hidden border-2 ${
// //           isCameraOff ? 'border-red-500' : 'border-white'
// //         } transition-all`}>
// //           <video
// //             ref={localVideoRef}
// //             autoPlay
// //             playsInline
// //             muted
// //             className="w-full h-full object-cover"
// //           />
// //           {isCameraOff && (
// //             <div className="absolute inset-0 bg-black flex items-center justify-center">
// //               <VideoCameraAddOutlined className="text-white text-xl" />
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Controls */}
// //       <div className="absolute bottom-6 left-0 right-0 flex justify-center">
// //         <div className="bg-black bg-opacity-60 rounded-full px-6 py-3 flex items-center">
// //           <Space size="large">
// //             <Button
// //               shape="circle"
// //               size="large"
// //               icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
// //               onClick={toggleMute}
// //               className={`${isMuted ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
// //             />
// //             <Button
// //               shape="circle"
// //               size="large"
// //               icon={isCameraOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
// //               onClick={toggleCamera}
// //               className={`${isCameraOff ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
// //             />
// //             <Button
// //               type="primary"
// //               danger
// //               shape="circle"
// //               size="large"
// //               icon={<PhoneOutlined />}
// //               onClick={endCall}
// //               className="h-12 w-12 flex items-center justify-center"
// //             />
// //           </Space>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoCallRoom;
// // ============================================================================
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Button, Space, message } from 'antd';
// // import { 
// //   AudioOutlined, 
// //   AudioMutedOutlined, 
// //   VideoCameraOutlined, 
// //   VideoCameraAddOutlined,
// //   PhoneOutlined 
// // } from '@ant-design/icons';

// // const VideoCallRoom = ({ callData, onEndCall }) => {
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStream, setRemoteStream] = useState(null);
// //   const [isMuted, setIsMuted] = useState(false);
// //   const [isCameraOff, setIsCameraOff] = useState(false);
// //   const [callStatus, setCallStatus] = useState(callData?.status || 'initiating');
// //   const [socket, setSocket] = useState(null);
// //   const [peerConnection, setPeerConnection] = useState(null);
// //   const localVideoRef = useRef(null);
// //   const remoteVideoRef = useRef(null);

// //   useEffect(() => {
// //     const setupCall = async () => {
// //       try {
// //         // 1. Get user media
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           audio: true,
// //           video: true
// //         });
// //         setLocalStream(stream);
        
// //         if (localVideoRef.current) {
// //           localVideoRef.current.srcObject = stream;
// //         }

// //         // 2. Create WebSocket connection
// //         const ws = new WebSocket(
// //           `ws://${window.location.host}/ws/video-call/`
// //         );
// //         setSocket(ws);

// //         // 3. Create peer connection
// //         const pc = new RTCPeerConnection({
// //           iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
// //         });
// //         setPeerConnection(pc);

// //         // Add local stream to connection
// //         stream.getTracks().forEach(track => {
// //           pc.addTrack(track, stream);
// //         });

// //         // Handle remote stream
// //         pc.ontrack = (event) => {
// //           setRemoteStream(event.streams[0]);
// //           if (remoteVideoRef.current) {
// //             remoteVideoRef.current.srcObject = event.streams[0];
// //           }
// //         };

// //         // ICE candidate handling
// //         pc.onicecandidate = (event) => {
// //           if (event.candidate && ws.readyState === WebSocket.OPEN) {
// //             ws.send(JSON.stringify({
// //               action: 'ice_candidate',
// //               candidate: event.candidate,
// //               call_id: callData.callId
// //             }));
// //           }
// //         };

// //         // WebSocket message handling
// //         ws.onmessage = async (event) => {
// //           try {
// //             const data = JSON.parse(event.data);
            
// //             if (data.action === 'offer') {
// //               await pc.setRemoteDescription(new RTCSessionDescription(data));
// //               const answer = await pc.createAnswer();
// //               await pc.setLocalDescription(answer);
// //               ws.send(JSON.stringify({
// //                 action: 'answer',
// //                 answer: answer,
// //                 call_id: callData.callId
// //               }));
// //             } 
// //             else if (data.action === 'answer') {
// //               await pc.setRemoteDescription(new RTCSessionDescription(data));
// //             }
// //             else if (data.action === 'ice_candidate') {
// //               await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
// //             }
// //             else if (data.action === 'call_accepted') {
// //               setCallStatus('connected');
// //             }
// //             else if (data.action === 'call_rejected') {
// //               message.error('Call rejected by provider');
// //               onEndCall();
// //             }
// //           } catch (err) {
// //             console.error('WebSocket message error:', err);
// //           }
// //         };

// //         ws.onerror = (error) => {
// //           console.error('WebSocket error:', error);
// //           message.error('Connection error');
// //           onEndCall();
// //         };

// //         ws.onclose = () => {
// //           console.log('WebSocket disconnected');
// //         };

// //         // Send call initiation
// //         if (callStatus === 'initiating' && ws.readyState === WebSocket.OPEN) {
// //           ws.send(JSON.stringify({
// //             action: 'initiate_call',
// //             provider_username: callData.providerUsername,
// //             call_id: callData.callId
// //           }));
// //           setCallStatus('ringing');
// //         }

// //       } catch (err) {
// //         console.error('Error setting up call:', err);
// //         message.error('Failed to start call: ' + err.message);
// //         onEndCall();
// //       }
// //     };

// //     setupCall();

// //     return () => {
// //       if (localStream) {
// //         localStream.getTracks().forEach(track => track.stop());
// //       }
// //       if (socket) {
// //         socket.close();
// //       }
// //       if (peerConnection) {
// //         peerConnection.close();
// //       }
// //     };
// //   }, [callData, callStatus, onEndCall]);

// //   // ... rest of the component remains the same ...
// // };

// // export default VideoCallRoom;

// import React, { useState, useEffect, useRef } from 'react';
// import { Button, Space, message } from 'antd';
// import { 
//   AudioOutlined, 
//   AudioMutedOutlined, 
//   VideoCameraOutlined, 
//   VideoCameraAddOutlined,
//   PhoneOutlined 
// } from '@ant-design/icons';

// const VideoCallRoom = ({ callData, onEndCall }) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOff, setIsCameraOff] = useState(false);
//   const [callStatus, setCallStatus] = useState(callData.status);
//   const [socket, setSocket] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();

//   useEffect(() => {
//     const setupCall = async () => {
//       try {
//         // 1. Get user media
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: true
//         });
//         setLocalStream(stream);

//         // ✅ FIXED: Only assign srcObject if ref is ready
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         // 2. Create WebSocket connection
//         const ws = new WebSocket(
//           `ws://${window.location.host}/ws/video-call/`
//         );
//         setSocket(ws);

//         // 3. Create peer connection
//         const pc = new RTCPeerConnection({
//           iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//         });
//         setPeerConnection(pc);

//         // Add local stream to connection
//         stream.getTracks().forEach(track => {
//           pc.addTrack(track, stream);
//         });

//         // Handle remote stream
//         pc.ontrack = (event) => {
//           setRemoteStream(event.streams[0]);
//           // ✅ FIXED: Check if ref is mounted
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         // ICE candidate handling
//         pc.onicecandidate = (event) => {
//           if (event.candidate) {
//             ws.send(JSON.stringify({
//               action: 'ice_candidate',
//               candidate: event.candidate,
//               call_id: callData.callId
//             }));
//           }
//         };

//         // WebSocket message handling
//         ws.onmessage = async (event) => {
//           const data = JSON.parse(event.data);

//           if (data.action === 'offer') {
//             await pc.setRemoteDescription(new RTCSessionDescription(data));
//             const answer = await pc.createAnswer();
//             await pc.setLocalDescription(answer);
//             ws.send(JSON.stringify({
//               action: 'answer',
//               answer: answer,
//               call_id: callData.callId
//             }));
//           } 
//           else if (data.action === 'answer') {
//             await pc.setRemoteDescription(new RTCSessionDescription(data));
//           }
//           else if (data.action === 'ice_candidate') {
//             await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//           }
//           else if (data.action === 'call_accepted') {
//             setCallStatus('connected');
//           }
//           else if (data.action === 'call_rejected') {
//             message.error('Call rejected by provider');
//             onEndCall();
//           }
//         };

//         // Send call initiation
//         if (callData.status === 'initiating') {
//           ws.send(JSON.stringify({
//             action: 'initiate_call',
//             provider_username: callData.providerUsername,
//             call_id: callData.callId
//           }));
//           setCallStatus('ringing');
//         }

//       } catch (err) {
//         console.error('Error setting up call:', err);
//         message.error('Failed to start call');
//         onEndCall();
//       }
//     };

//     // Delay setup to ensure refs are mounted
//     const timer = setTimeout(() => setupCall(), 0);

//     return () => {
//       clearTimeout(timer);
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//       if (socket) {
//         socket.close();
//       }
//       if (peerConnection) {
//         peerConnection.close();
//       }
//     };
//   }, []);

//   const toggleMute = () => {
//     if (localStream) {
//       localStream.getAudioTracks().forEach(track => {
//         track.enabled = !track.enabled;
//       });
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleCamera = () => {
//     if (localStream) {
//       localStream.getVideoTracks().forEach(track => {
//         track.enabled = !track.enabled;
//       });
//       setIsCameraOff(!isCameraOff);
//     }
//   };

//   const endCall = () => {
//     if (socket) {
//       socket.send(JSON.stringify({
//         action: 'end_call',
//         call_id: callData.callId
//       }));
//     }
//     onEndCall();
//   };

//   return (
//     <div className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden">
//       {/* Remote Video */}
//       {callStatus === 'connected' ? (
//         <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
//           <video 
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center">
//             <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//             <span className="font-medium">{callData.providerUsername}</span>
//           </div>
//         </div>
//       ) : (
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
//           <div className="w-32 h-32 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6">
//             <VideoCameraOutlined className="text-white text-4xl" />
//           </div>
//           <div className="text-white text-2xl font-medium mb-2">
//             {callStatus === 'ringing' ? 'Ringing...' : 'Connecting...'}
//           </div>
//           <div className="text-gray-300">
//             Calling {callData.providerUsername}
//           </div>
//         </div>
//       )}

//       {/* Local Video */}
//       {callStatus === 'connected' && (
//         <div className={`absolute bottom-24 right-6 w-48 h-36 rounded-xl overflow-hidden border-2 ${
//           isCameraOff ? 'border-red-500' : 'border-white'
//         } transition-all`}>
//           <video
//             ref={localVideoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full h-full object-cover"
//           />
//           {isCameraOff && (
//             <div className="absolute inset-0 bg-black flex items-center justify-center">
//               <VideoCameraAddOutlined className="text-white text-xl" />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Controls */}
//       <div className="absolute bottom-6 left-0 right-0 flex justify-center">
//         <div className="bg-black bg-opacity-60 rounded-full px-6 py-3 flex items-center">
//           <Space size="large">
//             <Button
//               shape="circle"
//               size="large"
//               icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
//               onClick={toggleMute}
//               className={`${isMuted ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
//             />
//             <Button
//               shape="circle"
//               size="large"
//               icon={isCameraOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
//               onClick={toggleCamera}
//               className={`${isCameraOff ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
//             />
//             <Button
//               type="primary"
//               danger
//               shape="circle"
//               size="large"
//               icon={<PhoneOutlined />}
//               onClick={endCall}
//               className="h-12 w-12 flex items-center justify-center"
//             />
//           </Space>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCallRoom;
import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, message } from 'antd';
import {
  AudioOutlined,
  AudioMutedOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  PhoneOutlined
} from '@ant-design/icons';

const VideoCallRoom = ({ callData, onEndCall }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callStatus, setCallStatus] = useState(callData.status);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const setupCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const ws = new WebSocket(`ws://${window.location.host}/ws/video-call/`);
        setSocket(ws);

        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        setPeerConnection(pc);

        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            ws.send(JSON.stringify({
              action: 'ice_candidate',
              candidate: event.candidate,
              call_id: callData.callId
            }));
          }
        };

        ws.onmessage = async (event) => {
          const data = JSON.parse(event.data);
          if (data.action === 'offer') {
            await pc.setRemoteDescription(new RTCSessionDescription(data));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            ws.send(JSON.stringify({
              action: 'answer',
              answer: answer,
              call_id: callData.callId
            }));
          } else if (data.action === 'answer') {
            await pc.setRemoteDescription(new RTCSessionDescription(data));
          } else if (data.action === 'ice_candidate') {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } else if (data.action === 'call_accepted') {
            setCallStatus('connected');
          } else if (data.action === 'call_rejected') {
            message.error('Call rejected by provider');
            onEndCall();
          }
        };

        // ✅ WAIT for socket to open before sending 'initiate_call'
        ws.onopen = () => {
          if (callData.status === 'initiating') {
            ws.send(JSON.stringify({
              action: 'initiate_call',
              provider_username: callData.providerUsername,
              call_id: callData.callId
            }));
            setCallStatus('ringing');
          }
        };

      } catch (err) {
        console.error('Error setting up call:', err);
        message.error('Failed to start call');
        onEndCall();
      }
    };

    setupCall();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (socket) {
        socket.close();
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const endCall = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        action: 'end_call',
        call_id: callData.callId
      }));
    }
    onEndCall();
  };

  return (
    <div className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* Remote Video */}
      {callStatus === 'connected' ? (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="font-medium">{callData.providerUsername}</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
          <div className="w-32 h-32 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6">
            <VideoCameraOutlined className="text-white text-4xl" />
          </div>
          <div className="text-white text-2xl font-medium mb-2">
            {callStatus === 'ringing' ? 'Ringing...' : 'Connecting...'}
          </div>
          <div className="text-gray-300">
            Calling {callData.providerUsername}
          </div>
        </div>
      )}

      {/* Local Video */}
      {callStatus === 'connected' && (
        <div className={`absolute bottom-24 right-6 w-48 h-36 rounded-xl overflow-hidden border-2 ${
          isCameraOff ? 'border-red-500' : 'border-white'
        } transition-all`}>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {isCameraOff && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <VideoCameraAddOutlined className="text-white text-xl" />
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="bg-black bg-opacity-60 rounded-full px-6 py-3 flex items-center">
          <Space size="large">
            <Button
              shape="circle"
              size="large"
              icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
              onClick={toggleMute}
              className={`${isMuted ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
            />
            <Button
              shape="circle"
              size="large"
              icon={isCameraOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
              onClick={toggleCamera}
              className={`${isCameraOff ? 'bg-red-500' : 'bg-white'} h-12 w-12 flex items-center justify-center`}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              size="large"
              icon={<PhoneOutlined />}
              onClick={endCall}
              className="h-12 w-12 flex items-center justify-center"
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default VideoCallRoom;
