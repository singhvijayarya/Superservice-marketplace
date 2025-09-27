export class WebSocketManager {
    constructor(url, options = {}) {
      this.url = url;
      this.options = options;
      this.socket = null;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
      this.reconnectInterval = options.reconnectInterval || 3000;
      this.listeners = {
        open: [],
        message: [],
        error: [],
        close: [],
      };
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = (event) => {
        this.reconnectAttempts = 0;
        this.emit('open', event);
      };
  
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit('message', data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          this.emit('error', error);
        }
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
  
      this.socket.onclose = (event) => {
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          setTimeout(() => {
            console.warn(`Reconnecting attempt ${this.reconnectAttempts}...`);
            this.connect();
          }, this.reconnectInterval);
        }
        this.emit('close', event);
      };
    }
  
    send(data) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
      } else {
        console.warn('WebSocket is not open. Message not sent:', data);
      }
    }
  
    on(eventType, callback) {
      if (this.listeners[eventType]) {
        this.listeners[eventType].push(callback);
      }
    }
  
    emit(eventType, data) {
      if (this.listeners[eventType]) {
        this.listeners[eventType].forEach((callback) => {
          try {
            callback(data);
          } catch (err) {
            console.error(`Error in '${eventType}' event callback:`, err);
          }
        });
      }
    }
  
    close() {
      if (this.socket) {
        this.socket.close(1000, 'Normal closure');
        this.socket = null;
      }
    }
  }
  