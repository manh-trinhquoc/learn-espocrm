<?php
return [
  'database' => [
    'driver' => 'pdo_mysql',
    'host' => 'mysql',
    'port' => '',
    'charset' => 'utf8mb4',
    'dbname' => 'espocrm',
    'user' => 'espocrm',
    'password' => 'database_password'
  ],
  'logger' => [
    'path' => 'data/logs/espo.log',
    'level' => 'WARNING',
    'rotation' => true,
    'maxFileNumber' => 30,
    'printTrace' => false
  ],
  'restrictedMode' => false,
  'webSocketMessager' => 'ZeroMQ',
  'isInstalled' => true,
  'microtimeInternal' => 1660119515.889087,
  'passwordSalt' => 'ab90248da8974180',
  'cryptKey' => '47bd8288e74b15f99f49bc058b01cfa7',
  'hashSecretKey' => 'e99903fabacda8a4aa16ec2587128ceb',
  'defaultPermissions' => [
    'user' => 'www-data',
    'group' => 'www-data'
  ],
  'actualDatabaseType' => 'mysql',
  'actualDatabaseVersion' => '8.0.30',
  'webSocketZeroMQSubmissionDsn' => 'tcp://espocrm-websocket:7777',
  'webSocketZeroMQSubscriberDsn' => 'tcp://*:7777'
];
