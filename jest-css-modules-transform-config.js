module.exports = {
  injectIntoDOM: true,
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  // ✅ Injicera CSS variables också
  createStyleTag: true
  // insertCss: (css) => {
  //   const style = document.createElement('style');
  //   style.textContent = css;
  //   document.head.appendChild(style);
  // }
};

// const path = require('path');
// const additionalResolvePath = path.resolve(__dirname, 'src', 'additional_modules');
//
// module.exports = {
//   sassConfig: {
//     includePaths: [additionalResolvePath],
//     precision: 5
//   },
//   lessConfig: {
//     paths: [additionalResolvePath]
//   },
//   stylusConfig: {
//     paths: [additionalResolvePath]
//   },
//   postcssConfig: {
//     plugins: [
//       require('autoprefixer')({
//         browsers: ['Chrome 68', 'Firefox 62', 'Safari 12']
//       })
//     ]
//   }
// };
