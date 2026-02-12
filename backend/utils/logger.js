/**
 * Logger Utility
 * Centralized logging for the application
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Format timestamp
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Format log message
   */
  formatMessage(level, message, data = null) {
    const timestamp = this.getTimestamp();
    let formattedMessage = `[${timestamp}] [${level}] ${message}`;
    
    if (data && this.isDevelopment) {
      formattedMessage += '\n' + JSON.stringify(data, null, 2);
    }
    
    return formattedMessage;
  }

  /**
   * Colorize console output
   */
  colorize(text, color) {
    if (!this.isDevelopment) return text;
    return `${color}${text}${colors.reset}`;
  }

  /**
   * Info log
   */
  info(message, data = null) {
    const formatted = this.formatMessage('INFO', message, data);
    console.log(this.colorize(formatted, colors.blue));
  }

  /**
   * Success log
   */
  success(message, data = null) {
    const formatted = this.formatMessage('SUCCESS', message, data);
    console.log(this.colorize(formatted, colors.green));
  }

  /**
   * Warning log
   */
  warn(message, data = null) {
    const formatted = this.formatMessage('WARN', message, data);
    console.warn(this.colorize(formatted, colors.yellow));
  }

  /**
   * Error log
   */
  error(message, error = null) {
    const formatted = this.formatMessage('ERROR', message);
    console.error(this.colorize(formatted, colors.red));
    
    if (error && this.isDevelopment) {
      console.error(this.colorize(error.stack || error, colors.red));
    }
  }

  /**
   * Debug log (only in development)
   */
  debug(message, data = null) {
    if (!this.isDevelopment) return;
    
    const formatted = this.formatMessage('DEBUG', message, data);
    console.log(this.colorize(formatted, colors.magenta));
  }

  /**
   * Request log
   */
  request(req) {
    if (!this.isDevelopment) return;
    
    const message = `${req.method} ${req.originalUrl}`;
    const data = {
      ip: req.ip,
      userAgent: req.get('user-agent'),
      body: req.body,
      query: req.query,
      params: req.params
    };
    
    console.log(this.colorize(`[${this.getTimestamp()}] [REQUEST] ${message}`, colors.cyan));
    if (Object.keys(data.body).length > 0 || Object.keys(data.query).length > 0) {
      console.log(this.colorize(JSON.stringify(data, null, 2), colors.dim));
    }
  }

  /**
   * Database query log
   */
  query(query, duration = null) {
    if (!this.isDevelopment) return;
    
    const message = duration 
      ? `Query executed in ${duration}ms` 
      : 'Query executed';
    
    console.log(this.colorize(`[${this.getTimestamp()}] [DB] ${message}`, colors.magenta));
    console.log(this.colorize(query, colors.dim));
  }

  /**
   * Log separator
   */
  separator(char = '=', length = 50) {
    console.log(char.repeat(length));
  }

  /**
   * Log box (for important messages)
   */
  box(message) {
    const border = '═'.repeat(message.length + 4);
    console.log(`╔${border}╗`);
    console.log(`║  ${this.colorize(message, colors.bright)}  ║`);
    console.log(`╚${border}╝`);
  }

  /**
   * Log table (for structured data)
   */
  table(data) {
    if (!this.isDevelopment) return;
    console.table(data);
  }
}

// Export singleton instance
module.exports = new Logger();
