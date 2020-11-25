const {alias, configPaths} = require('react-app-rewire-alias');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces');


module.exports = function override(config, env) {
  config = alias({
    ...configPaths('tsconfig.base.json'),
  })(config);
  // config = rewireReactHotLoader(config, env);
  // ...rewireReactHotLoader(config, env),
  // config = rewireYarnWorkspaces(config, env);
  
  return rewireYarnWorkspaces(config, env)
  // return config;
}