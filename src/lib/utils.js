// Utility Functions

const renderIf = function(cond, then, other) {
  if (cond)
    return then;
  else if (other)
    return other;
}

const utils = {
  renderIf
};


export default utils;
