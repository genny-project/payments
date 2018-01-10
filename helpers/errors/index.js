module.exports = {
  AUTH_REQUIRED: new Error( 'Whoops! You must be logged in to complete this action.' ),
  ACCESS_DENIED: new Error( 'Whoops! You don\'t have permission to complete this action.' ),
  NOT_IMPLEMENTED: {
    status: 501,
    data: {
      error: 'This method / request is not implemented for this payment provider.',
    }
  },
};
