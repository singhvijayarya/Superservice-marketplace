import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Card, Spin, Empty, Rate, Avatar, Divider } from 'antd';
import axios from 'axios';
import ReviewSummary from './ReviewSummary';
import { motion } from 'framer-motion';
import { StarFilled, EnvironmentFilled, PhoneFilled, CheckCircleFilled, SearchOutlined } from '@ant-design/icons';
import "../styles/ProviderFilter.css"  // Create this CSS file for custom styles
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

const { Option } = Select;

const ProviderFilter = () => {
  const [filters, setFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [seeker, setProfile] = useState([]);
  const [error, setError] = useState([]);

  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  // Create floating stars for background
  useEffect(() => {
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 2
    }));
    setStars(newStars);
  }, []);

  // Fetch Providers
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(ACCESS_TOKEN)
        const response = await axios.get('http://localhost:8001/api/providers/', { params: filters });
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [filters]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Could not load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleFilterChange = (changedValues) => {
    setFilters({ ...filters, ...changedValues });
  };

  
  const handleSubmit = () => {
    setLoading(true); // Trigger fake loading
    setTimeout(() => {
      setLoading(false); // End fake loading after 800ms
    }, 800);
  };

  // const rendertodashboard= async (provider)=>{
    const rendertodashboard = () => {
        navigate("/ProviderDashboard");
    };
  // }




  const handleContact = async (provider) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const seekeruser = seeker.username  // Make sure this is set correctly on login
   console.log(seeker) 
    
    // Debug log to check values
    console.log("Seeker:", seekeruser);
    console.log("Provider:", provider);
    // Fix: If provider.user is an object, get its username
    // const providerUsername = typeof provider.user === "string" ? provider.user : provider.user?.username;
    const providerUsername=provider.username
  
    if (!seekeruser || !providerUsername) {
      console.error("⚠️ seekeruser or providerUsername missing", { seekeruser, providerUsername });
      alert("Missing seeker or provider username.");
      return;
    }
    
  
    try {
      const res = await axios.post("http://localhost:8001/api/book-provider/", {
        seeker: seeker.username,
        provider: provider.username,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Provider booked successfully!");
      console.log("Booking response:", res.data);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Booking failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="stellar-container">
      {/* Animated background stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            opacity: star.opacity
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.5, star.opacity],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay
          }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-filter-panel-vertical"
      >
        <h2 className="form-title">Find the Perfect Professional</h2>
        <p className="form-subtitle">Fill in the details below to find qualified professionals in your area</p>
        
        <Divider className="form-divider" />
        
        <Form 
          onValuesChange={handleFilterChange} 
          onFinish={handleSubmit} 
          layout="vertical"
          className="vertical-filter-form"
        >
          <Form.Item 
            name="role" 
            label={<span className="filter-label">Profession</span>}
            className="form-item-vertical"
          >
            <Select 
              placeholder="Select a profession" 
              className="stellar-select-vertical"
              suffixIcon={<StarFilled style={{ color: 'var(--primary-color)' }} />}
              size="large"
            >
              <Option value="Plumber">Plumber</Option>
              <Option value="Electrician">Electrician</Option>
              <Option value="Carpenter">Carpenter</Option>
              <Option value="Painter">Painter</Option>
              <Option value="Cleaner">Cleaner</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="address" 
            label={<span className="filter-label">Location</span>}
            className="form-item-vertical"
          >
            <Input 
              placeholder="Enter your city or neighborhood" 
              className="stellar-input-vertical"
              prefix={<EnvironmentFilled style={{ color: 'var(--primary-color)' }} />}
              size="large"
            />
          </Form.Item>

          <div className="rating-filters-container">
            <Form.Item 
              name="rating" 
              label={<span className="filter-label">Minimum Rating</span>}
              className="form-item-vertical"
            >
              <Select 
                placeholder="Select minimum rating" 
                className="stellar-select-vertical"
                suffixIcon={<StarFilled style={{ color: 'var(--primary-color)' }} />}
                size="large"
              >
                <Option value="5">5 stars</Option>
                <Option value="4.5">4.5+ stars</Option>
                <Option value="4">4+ stars</Option>
                <Option value="3">3+ stars</Option>
              </Select>
            </Form.Item>

            <Form.Item 
              name="min_reviews" 
              label={<span className="filter-label">Minimum Reviews</span>}
              className="form-item-vertical"
            >
              <Select 
                placeholder="Select minimum reviews" 
                className="stellar-select-vertical"
                suffixIcon={<StarFilled style={{ color: 'var(--primary-color)' }} />}
                size="large"
              >
                <Option value="5">5+ reviews</Option>
                <Option value="10">10+ reviews</Option>
                <Option value="20">20+ reviews</Option>
                <Option value="50">50+ reviews</Option>
              </Select>
            </Form.Item>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="stellar-button-vertical"
              icon={<SearchOutlined />}
              onClick={handleSubmit}
              size="large"
              block //if serach not work remove the block element because it block ir.
            >
              Search Professionals
            </Button>
          </motion.div>
        </Form>
      </motion.div>

      {/* Rest of your component remains the same */}
      <div style={{ marginTop: 40 }}>
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <div className="pulse-effect"></div>
          </div>
        ) : providers.length > 0 ? (
          <Row gutter={[24, 24]}>
            {providers.map((provider, index) => (
              <Col xs={24} sm={12} md={8} key={provider.user}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="stellar-card"
                    hoverable
                    cover={
                      <div className="card-header">
                        <Avatar 
                        onClick={() => rendertodashboard(provider)}
                          src={provider.profile_picture} 
                          size={100} 
                          className="profile-avatar"
                        />
                        <div className='username ml-24 text-2xl'>
                          {provider.username}
                        </div>
                        <div className="shine-effect"></div>
                      </div>
                      

                    }
                  >
                    <div className="card-body">
                      <h3 className="provider-name">{provider.user}</h3>
                      <div className="provider-meta">
                        <span className="provider-role">
                          <StarFilled style={{ color: 'var(--primary-color)', marginRight: 5 }} />
                          {provider.role}
                        </span>
                        <span className="provider-rating">
                          <Rate 
                            disabled 
                            defaultValue={4.5} 
                            allowHalf 
                            style={{ color: 'var(--primary-color)', fontSize: 14 }} 
                          />
                          <span className="rating-text">4.5</span>
                        </span>
                      </div>
                      
                      <div className="provider-info">
                        <p>
                          <EnvironmentFilled style={{ color: 'var(--primary-color)', marginRight: 8 }} />
                          {provider.address}
                        </p>
                        <p>
                          <PhoneFilled style={{ color: 'var(--primary-color)', marginRight: 8 }} />
                          {provider.phone}
                        </p>
                        <p className="provider-status">
                          <CheckCircleFilled style={{ 
                            color: provider.status === 'Available' ? '#52c41a' : '#f5222d',
                            marginRight: 8 
                          }} />
                          {provider.status}
                        </p>
                      </div>
                      
                      <ReviewSummary username={provider.username} />
                      
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button 
                          type="primary" 
                          className="contact-button"
                          onClick={() => handleContact(provider)}

                          block
                        >
                          Hire  
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Empty 
              description="No providers found matching your criteria" 
              imageStyle={{ height: 100 }}
              className="empty-state"
            >
              <Button 
                type="primary" 
                onClick={() => setFilters({})}
                className="reset-button"
              >
                Reset Filters
              </Button>
            </Empty>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProviderFilter;