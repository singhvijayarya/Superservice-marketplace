import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Card,
  Spin,
  Empty,
  Rate,
  Avatar,
  Divider,
  Tag,
} from "antd";
import {
  StarFilled,
  EnvironmentFilled,
  PhoneFilled,
  CheckCircleFilled,
  SearchOutlined,
  UserOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { ACCESS_TOKEN } from "../constants";
import ReviewSummary from "../components/ReviewSummary";
import "../styles/SearchResult.css";

const SearchResults = () => {
  const location = useLocation();
  const { providers } = location.state || { providers: [] };
  const navigate = useNavigate();

  const handleContact = (token) => {
    if (token) {
      navigate("/ProviderDashboard");
    } else {
      navigate("/");
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="glass-search-results">
      {/* Animated background elements */}
      <div className="glass-bg-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="glass-particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-content-wrapper"
      >
        <motion.div
          className="glass-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>
            <SearchOutlined className="glass-header-icon" />
            Search Results
          </h1>
          <p className="glass-subtitle">
            {providers.length} professional{providers.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </motion.div>

        <div className="glass-results-container">
          {providers.length > 0 ? (
            <Row gutter={[24, 24]}>
              {providers.map((provider, index) => (
                <Col xs={24} sm={12} md={8} lg={8} key={provider.username}>
                  <motion.div
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="glass-provider-card" hoverable>
                      <div className="glass-card-header">
                        <div className="glass-avatar-container">
                          <Avatar
                            src={`http://127.0.0.1:8001${provider.profile_picture}`} 
                            size={80}
                            icon={<UserOutlined />}
                            className="glass-avatar"
                          />
                          <div
                            className="glass-status-badge"
                            data-status={provider.status}
                          />
                        </div>
                        <div className="glass-provider-info">
                          <h3 className="glass-provider-name">
                            {provider.username}
                          </h3>
                          <Tag color="geekblue" className="glass-provider-role">
                            {provider.role}
                          </Tag>
                        </div>
                      </div>

                      <div className="glass-card-body">
                        <div className="glass-detail-row">
                          <EnvironmentFilled className="glass-detail-icon" />
                          <span>
                            {provider.address || "Location not specified"}
                          </span>
                        </div>
                        <div className="glass-detail-row">
                          <PhoneFilled className="glass-detail-icon" />
                          <span>{provider.phone || "Phone not provided"}</span>
                        </div>

                        <p className="provider-status text-white">
                          <CheckCircleFilled
                            style={{
                              color:
                                provider.status === "online"
                                  ? "#52c41a"
                                  : "#f5222d",
                              marginRight: 8,
                            }}
                          />
                          {provider.status}
                        </p>
                      </div>

                      <ReviewSummary
                        username={provider.username}
                        className="glass-review-summary"
                      />

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="glass-card-footer"
                      >
                        <Button
                          type="primary"
                          className="glass-contact-btn"
                          onClick={handleContact}
                          icon={<RocketOutlined />}
                          block
                        >
                          Hire Professional
                        </Button>
                      </motion.div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-empty-state"
            >
              <Empty
                description={
                  <span className="glass-empty-description">
                    No professionals match your search criteria
                  </span>
                }
                imageStyle={{ height: 120 }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchResults;
