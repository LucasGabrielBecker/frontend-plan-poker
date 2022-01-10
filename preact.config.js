import envVars from 'preact-cli-plugin-env-vars';

export default function (config, env, helpers) {
  envVars(config, env, helpers);
}


function injectGlobalEnv(config) {
  if (!process || !process.env) return config;

  const envPrefix = 'PREACT_APP_';
  const filteredEnv = Object.keys(process.env).reduce((acc, key) => {
    if (key.startsWith(envPrefix)) {
      acc[key] = process.env[key];
    }
    return acc;
  }, {});

  config.plugins.forEach(plugin => {
    if (plugin && plugin.constructor.name === 'DefinePlugin') {
      Object.keys(filteredEnv).forEach(envKey => {
        plugin.definitions[`process.env.${envKey}`] = JSON.stringify(filteredEnv[envKey]);
      });
    }
  });

  return config;
}