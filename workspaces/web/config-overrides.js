const {alias, configPaths} = require('react-app-rewire-alias')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')


module.exports = function override(config, env) {
  alias({
    ...configPaths('tsconfig.base.json')
  })(config)

  return rewireReactHotLoader(config, env);
}