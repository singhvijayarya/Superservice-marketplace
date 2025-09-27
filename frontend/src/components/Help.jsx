
import React from "react";
import { motion } from "framer-motion";
import { Button, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../styles/Help.css";

function Help({ help, onRemove }) {
  const formatteDate = new Date(help.created_at).toLocaleDateString("en-US");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        className="help-container glassmorphism-card"
        hoverable
        actions={[
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onRemove(help.id)}
          >
            Remove
          </Button>,
        ]}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="help-title">{help.title}</p>
          <p className="help-content">{help.content}</p>
          <p className="help-date">{formatteDate}</p>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export default Help;