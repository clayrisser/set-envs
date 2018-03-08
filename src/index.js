import _ from 'lodash';

export default function setEnvs(configString) {
  const matches = configString.match(/\${((\\})|[^}])+}/g);
  _.each(matches, match => {
    const env = getEnvFromMatch(match);
    configString = configString.replace(match, env);
  });
  return configString;
}

export function getEnvFromMatch(match) {
  let envDefault = '';
  let envName = match.substr(2, match.length - 3);
  const index = envName.search(/[^\\]:/);
  if (index > -1) {
    envDefault = envName.substr(index + 2);
    envName = envName.substr(0, index + 1);
  }
  let env = process.env[envName];
  if (!env || env.length <= 0) env = envDefault;
  return env;
}
