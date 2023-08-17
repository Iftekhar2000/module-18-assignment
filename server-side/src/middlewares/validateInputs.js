const validator = require('validator');

function validateCommentInput(req, res, next) {
  const { text } = req.body;

  if (!validator.isLength(text, { min: 1, max: 500 })) {
    return res.status(400).json({ error: 'Comment text must be between 1 and 500 characters' });
  }

  next();
}

module.exports = {
  validateCommentInput
};
