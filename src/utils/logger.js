// for structured logging
const logError = (message, error) => {
  console.error(`${message}:`, {
    message: error.message,
    stack: error.stack,
  });
};

const logInfo = (message, info) => {
  console.log(`${message}:`, info);
};

module.exports = { logError, logInfo };
