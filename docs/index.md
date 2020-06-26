# Electron 


## Testing

```bash
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```
 
## babel.config.js
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
import renderer from 'react-test-renderer';
```
