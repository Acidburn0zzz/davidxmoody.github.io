const React = require('react')

module.exports = ({ href, disabled, children }) => {
  if (disabled) {
    return React.createElement('span', {className: 'pagination__disabled', children})
  }

  return React.createElement('a', {className: 'pagination__link', children, href})
}