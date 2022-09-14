<?php
return (object) [
  'Attachment' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'sourceId',
        1 => 'storage'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'sourceId',
        1 => 'storage'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [],
      'nonAdminReadOnly' => []
    ]
  ],
  'AuthLogRecord' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'username',
        1 => 'portal',
        2 => 'user',
        3 => 'authToken',
        4 => 'ipAddress',
        5 => 'isDenied',
        6 => 'denialReason',
        7 => 'requestUrl',
        8 => 'requestMethod'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'username',
        1 => 'portalId',
        2 => 'portalName',
        3 => 'userId',
        4 => 'userName',
        5 => 'authTokenId',
        6 => 'authTokenName',
        7 => 'ipAddress',
        8 => 'isDenied',
        9 => 'denialReason',
        10 => 'requestUrl',
        11 => 'requestMethod'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [],
      'nonAdminReadOnly' => []
    ]
  ],
  'AuthToken' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'token',
        1 => 'hash',
        2 => 'secret'
      ],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'token',
        1 => 'hash',
        2 => 'secret',
        3 => 'user',
        4 => 'portal',
        5 => 'ipAddress',
        6 => 'lastAccess',
        7 => 'createdAt',
        8 => 'modifiedAt'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'token',
        1 => 'hash',
        2 => 'secret'
      ],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'token',
        1 => 'hash',
        2 => 'secret',
        3 => 'userId',
        4 => 'userName',
        5 => 'portalId',
        6 => 'portalName',
        7 => 'ipAddress',
        8 => 'lastAccess',
        9 => 'createdAt',
        10 => 'modifiedAt'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [],
      'nonAdminReadOnly' => []
    ]
  ],
  'Email' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'messageId',
        1 => 'users',
        2 => 'tasks'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'messageId',
        1 => 'usersIds',
        2 => 'usersNames',
        3 => 'tasksIds',
        4 => 'tasksNames'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [
        0 => 'users'
      ],
      'readOnly' => [
        0 => 'tasks'
      ],
      'nonAdminReadOnly' => []
    ]
  ],
  'EmailAccount' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'password',
        1 => 'smtpPassword',
        2 => 'imapHandler',
        3 => 'smtpHandler'
      ],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'fetchData'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'password',
        1 => 'smtpPassword',
        2 => 'imapHandler',
        3 => 'smtpHandler'
      ],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'fetchData'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [],
      'nonAdminReadOnly' => []
    ]
  ],
  'InboundEmail' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'password',
        1 => 'smtpPassword',
        2 => 'imapHandler',
        3 => 'smtpHandler'
      ],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'fetchData'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'password',
        1 => 'smtpPassword',
        2 => 'imapHandler',
        3 => 'smtpHandler'
      ],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'fetchData'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [],
      'nonAdminReadOnly' => []
    ]
  ],
  'User' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'password',
        1 => 'passwordConfirm',
        2 => 'authLogRecordId',
        3 => 'userData'
      ],
      'onlyAdmin' => [
        0 => 'authMethod',
        1 => 'apiKey',
        2 => 'secretKey',
        3 => 'auth2FA'
      ],
      'readOnly' => [
        0 => 'apiKey',
        1 => 'secretKey'
      ],
      'nonAdminReadOnly' => [
        0 => 'userName',
        1 => 'type',
        2 => 'password',
        3 => 'passwordConfirm',
        4 => 'apiKey',
        5 => 'isActive',
        6 => 'emailAddress',
        7 => 'teams',
        8 => 'roles',
        9 => 'portals',
        10 => 'portalRoles',
        11 => 'contact',
        12 => 'accounts'
      ]
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'password',
        1 => 'passwordConfirm',
        2 => 'authLogRecordId',
        3 => 'userDataId',
        4 => 'userDataName'
      ],
      'onlyAdmin' => [
        0 => 'authMethod',
        1 => 'apiKey',
        2 => 'secretKey',
        3 => 'auth2FA'
      ],
      'readOnly' => [
        0 => 'apiKey',
        1 => 'secretKey'
      ],
      'nonAdminReadOnly' => [
        0 => 'userName',
        1 => 'type',
        2 => 'password',
        3 => 'passwordConfirm',
        4 => 'apiKey',
        5 => 'isActive',
        6 => 'emailAddressIsOptedOut',
        7 => 'emailAddress',
        8 => 'emailAddressData',
        9 => 'teamsIds',
        10 => 'teamsColumns',
        11 => 'teamsNames',
        12 => 'rolesIds',
        13 => 'rolesNames',
        14 => 'portalsIds',
        15 => 'portalsNames',
        16 => 'portalRolesIds',
        17 => 'portalRolesNames',
        18 => 'contactId',
        19 => 'contactName',
        20 => 'accountsIds',
        21 => 'accountsNames'
      ]
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [
        0 => 'userData'
      ],
      'onlyAdmin' => [
        0 => 'roles',
        1 => 'preferences'
      ],
      'readOnly' => [],
      'nonAdminReadOnly' => [
        0 => 'teams'
      ]
    ]
  ],
  'Case' => (object) [
    'fields' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'inboundEmail'
      ],
      'nonAdminReadOnly' => []
    ],
    'attributes' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'inboundEmailId',
        1 => 'inboundEmailName'
      ],
      'nonAdminReadOnly' => []
    ],
    'links' => (object) [
      'forbidden' => [],
      'internal' => [],
      'onlyAdmin' => [],
      'readOnly' => [
        0 => 'inboundEmail'
      ],
      'nonAdminReadOnly' => []
    ]
  ]
];
