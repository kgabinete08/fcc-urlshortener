// catch async await promise rejections
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
