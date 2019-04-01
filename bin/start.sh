#!/usr/bin/env bash

SCRIPTPATH="$(dirname $(realpath -s $0))"

echo "${SCRIPTPATH}"

API_DEFAULT_PATH="localhost"
API_ROOT=${API_ROOT/%":$1"/}

if [ -z $API_ROOT ]; then
  echo "API set to default (${API_DEFAULT_PATH})..."
  API_ROOT=$API_DEFAULT_PATH
else
  echo "API root is ${API_ROOT}"
fi

echo "import { Constants } from 'expo';

const ENV = {
  dev: {
    apiUrl: '${API_ROOT}',
  },
  staging: {
    apiUrl: '',
  },
  prod: {
    apiUrl: '',
  },
};

// eslint-disable-next-line consistent-return
function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev;
  if (env.indexOf('dev') !== -1) return ENV.dev;
  if (env.indexOf('staging') !== -1) return ENV.staging;
  if (env.indexOf('prod') !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);" > ${SCRIPTPATH}/../src/constants/environment.js

if [ -n $EXPO_USER ] && [ -n $EXPO_PASSWORD ]
then
  expo login -u $EXPO_USER -p $EXPO_PASSWORD
else
  echo "Expo credentials are not set, skipping log in."
  echo "To log in, export EXPO_USER and EXPO_PASSWORD env vars"
fi

# docker-compose -f docker-compose.yml up --build -d
expo start
