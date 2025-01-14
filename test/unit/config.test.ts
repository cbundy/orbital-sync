import { jest } from '@jest/globals';

describe('Config', () => {
  const INITIAL_ENV = Object.assign({}, process.env);
  let Config: typeof import('../../src/config').Config;

  const resetEnv = () => (process.env = Object.assign({}, INITIAL_ENV));
  const resetImport = async () => {
    jest.resetModules();

    ({ Config } = await import('../../src/config'));
  };

  beforeEach(() => resetImport());
  afterEach(() => resetEnv());

  const testToHaveDefaultAndOverride = (
    getter: keyof typeof Config,
    dflt: string | boolean | undefined,
    env: string
  ) => {
    test('should return default', () => {
      expect(Config[getter]).toStrictEqual(dflt);
    });

    test('should accept override', () => {
      let override: string | boolean;
      switch (typeof dflt) {
        case 'string':
          override = 'mock_value';
          break;
        case 'boolean':
          override = !dflt;
          break;
        case 'undefined':
          override = 'mock_value';
          break;
      }

      process.env[env] = override.toString();

      expect(Config[getter]).toStrictEqual(override);
    });
  };

  const testToThrowOrReturn = (getter: keyof typeof Config, env: string) => {
    test('should throw', () => {
      expect(() => Config[getter]).toThrow(
        expect.objectContaining({
          message: `The environment variable ${env} is required but not defined.`,
          exit: true
        })
      );
    });

    test('should accept override', () => {
      process.env[env] = 'mock_value';

      expect(Config[getter]).toStrictEqual('mock_value');
    });
  };

  describe('primaryHost', () => {
    test('should error and exit if "PRIMARY_HOST_BASE_URL" is undefined', () => {
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';

      expect(() => Config.primaryHost).toThrow(
        expect.objectContaining({
          message:
            'The environment variable PRIMARY_HOST_BASE_URL is required but not defined.',
          exit: true
        })
      );
    });

    test('should error and exit if "PRIMARY_HOST_PASSWORD" is undefined', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';

      expect(() => Config.primaryHost).toThrow(
        expect.objectContaining({
          message:
            'The environment variable PRIMARY_HOST_PASSWORD is required but not defined.',
          exit: true
        })
      );
    });

    test('should return primary host and memoize value', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';

      const expected = {
        baseUrl: 'http://10.0.0.2',
        fullUrl: 'http://10.0.0.2/admin',
        path: '/admin',
        password: 'mypassword'
      };

      expect(Config.primaryHost).toEqual(expected);
      resetEnv();
      expect(Config.primaryHost).toEqual(expected);
    });
  });

  describe('paths', () => {
    test('should recognise https scheme', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'https://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';

      const expected = 'https://10.0.0.2';

      expect(Config.primaryHost.baseUrl).toStrictEqual(expected);
    });
    test('should add default /admin path when not provided', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';

      const expected = 'http://10.0.0.2/admin';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should add user defined path', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '/mypath';

      const expected = 'http://10.0.0.2/mypath';
      const expectedPath = '/mypath';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
      expect(Config.primaryHost.path).toStrictEqual(expectedPath);
    });

    test('should handle single slash in base url', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2/';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';

      const expected = 'http://10.0.0.2/admin';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should trim trailing slash', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '/mypath/';

      const expected = 'http://10.0.0.2/mypath';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should allow empty path', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '';

      const expected = 'http://10.0.0.2';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should allow empty path from slash', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '/';

      const expected = 'http://10.0.0.2';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should add preceeding slash if ommitted', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = 'mypath';

      const expected = 'http://10.0.0.2/mypath';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should manage double slash', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2/';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '/mypath';

      const expected = 'http://10.0.0.2/mypath';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
    });

    test('should handle path provided in base url', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2/mypath/admin';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '';

      const expected = 'http://10.0.0.2/mypath/admin';
      const expectedPath = '/mypath/admin';
      const expectedBase = 'http://10.0.0.2';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
      expect(Config.primaryHost.path).toStrictEqual(expectedPath);
      expect(Config.primaryHost.baseUrl).toStrictEqual(expectedBase);
    });

    test('should combine path from base url and path env', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2/mypath';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '/admin';

      const expected = 'http://10.0.0.2/mypath/admin';
      const expectedPath = '/mypath/admin';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
      expect(Config.primaryHost.path).toStrictEqual(expectedPath);
    });

    test('should treat port as base url', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2:8080/';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword';
      process.env['PRIMARY_HOST_PATH'] = '/mypath';

      const expected = 'http://10.0.0.2:8080/mypath';
      const expectedPath = '/mypath';

      expect(Config.primaryHost.fullUrl).toStrictEqual(expected);
      expect(Config.primaryHost.path).toStrictEqual(expectedPath);
    });
  });

  describe('secondaryHosts', () => {
    test('should error and exit if "SECONDARY_HOST_1_BASE_URL" is undefined', () => {
      process.env['SECONDARY_HOST_1_PASSWORD'] = 'mypassword';

      expect(() => Config.secondaryHosts).toThrow(
        expect.objectContaining({
          message:
            'The environment variable SECONDARY_HOST_1_BASE_URL is required but not defined.',
          exit: true
        })
      );
    });

    test('should error and exit if "SECONDARY_HOST_1_PASSWORD" is undefined', () => {
      process.env['SECONDARY_HOST_1_BASE_URL'] = 'http://10.0.0.3';

      expect(() => Config.secondaryHosts).toThrow(
        expect.objectContaining({
          message:
            'The environment variable SECONDARY_HOST_1_PASSWORD is required but not defined.',
          exit: true
        })
      );
    });

    test('should return single secondary host and memoize value', () => {
      process.env['SECONDARY_HOST_1_BASE_URL'] = 'http://10.0.0.3';
      process.env['SECONDARY_HOST_1_PASSWORD'] = 'mypassword';

      const expected = [
        {
          baseUrl: 'http://10.0.0.3',
          password: 'mypassword',
          fullUrl: 'http://10.0.0.3/admin',
          path: '/admin'
        }
      ];

      expect(Config.secondaryHosts).toEqual(expected);
      resetEnv();
      expect(Config.secondaryHosts).toEqual(expected);
    });

    test('should return multiple secondary hosts', () => {
      process.env['SECONDARY_HOST_1_BASE_URL'] = 'http://10.0.0.3';
      process.env['SECONDARY_HOST_1_PASSWORD'] = 'mypassword1';
      process.env['SECONDARY_HOST_1_PATH'] = '/mypath';
      process.env['SECONDARY_HOST_2_BASE_URL'] = 'http://10.0.0.4';
      process.env['SECONDARY_HOST_2_PASSWORD'] = 'mypassword2';
      process.env['SECONDARY_HOST_2_PATH'] = '/mypath';
      process.env['SECONDARY_HOST_3_BASE_URL'] = 'http://10.0.0.5';
      process.env['SECONDARY_HOST_3_PASSWORD'] = 'mypassword3';
      process.env['SECONDARY_HOST_3_PATH'] = '/mypath';
      process.env['SECONDARY_HOST_5_BASE_URL'] = 'http://10.0.0.7';
      process.env['SECONDARY_HOST_5_PASSWORD'] = 'mypassword4';
      process.env['SECONDARY_HOST_5_PATH'] = '/mypath';

      expect(Config.secondaryHosts).toEqual([
        {
          baseUrl: 'http://10.0.0.3',
          password: 'mypassword1',
          fullUrl: 'http://10.0.0.3/mypath',
          path: '/mypath'
        },
        {
          baseUrl: 'http://10.0.0.4',
          password: 'mypassword2',
          fullUrl: 'http://10.0.0.4/mypath',
          path: '/mypath'
        },
        {
          baseUrl: 'http://10.0.0.5',
          password: 'mypassword3',
          fullUrl: 'http://10.0.0.5/mypath',
          path: '/mypath'
        }
      ]);
    });
  });

  describe('allHostBaseUrls', () => {
    test('should return all host base URLs', () => {
      process.env['PRIMARY_HOST_BASE_URL'] = 'http://10.0.0.2';
      process.env['PRIMARY_HOST_PASSWORD'] = 'mypassword1';
      process.env['SECONDARY_HOST_1_BASE_URL'] = 'http://10.0.0.3';
      process.env['SECONDARY_HOST_1_PASSWORD'] = 'mypassword2';
      process.env['SECONDARY_HOST_2_BASE_URL'] = 'http://10.0.0.4';
      process.env['SECONDARY_HOST_2_PASSWORD'] = 'mypassword3';

      expect(Config.allHostUrls).toStrictEqual([
        'http://10.0.0.2/admin',
        'http://10.0.0.3/admin',
        'http://10.0.0.4/admin'
      ]);
    });
  });

  describe('syncOptions', () => {
    test('should return defaults', () => {
      expect(Config.syncOptions).toStrictEqual({
        whitelist: true,
        regexWhitelist: true,
        blacklist: true,
        regexlist: true,
        adlist: true,
        client: true,
        group: true,
        auditlog: false,
        staticdhcpleases: false,
        localdnsrecords: true,
        localcnamerecords: true,
        flushtables: true
      });
    });

    test('should accept overrides and memoize', () => {
      process.env['SYNC_WHITELIST'] = 'false';
      process.env['SYNC_REGEX_WHITELIST'] = 'false';
      process.env['SYNC_BLACKLIST'] = 'false';
      process.env['SYNC_REGEXLIST'] = 'false';
      process.env['SYNC_ADLIST'] = 'false';
      process.env['SYNC_CLIENT'] = 'false';
      process.env['SYNC_GROUP'] = 'false';
      process.env['SYNC_AUDITLOG'] = 'true';
      process.env['SYNC_STATICDHCPLEASES'] = 'true';
      process.env['SYNC_LOCALDNSRECORDS'] = 'false';
      process.env['SYNC_LOCALCNAMERECORDS'] = 'false';
      process.env['SYNC_FLUSHTABLES'] = 'false';

      const expected = {
        whitelist: false,
        regexWhitelist: false,
        blacklist: false,
        regexlist: false,
        adlist: false,
        client: false,
        group: false,
        auditlog: true,
        staticdhcpleases: true,
        localdnsrecords: false,
        localcnamerecords: false,
        flushtables: false
      };

      expect(Config.syncOptions).toStrictEqual(expected);
      resetEnv();
      expect(Config.syncOptions).toStrictEqual(expected);
    });
  });

  describe('updateGravity', () => {
    testToHaveDefaultAndOverride('updateGravity', true, 'UPDATE_GRAVITY');
  });

  describe('verboseMode', () => {
    testToHaveDefaultAndOverride('verboseMode', false, 'VERBOSE');
  });

  describe('notifyOnSuccess', () => {
    testToHaveDefaultAndOverride('notifyOnSuccess', false, 'NOTIFY_ON_SUCCESS');
  });

  describe('notifyOnFailure', () => {
    testToHaveDefaultAndOverride('notifyOnFailure', true, 'NOTIFY_ON_FAILURE');
  });

  describe('notifyViaSmtp', () => {
    testToHaveDefaultAndOverride('notifyViaSmtp', false, 'NOTIFY_VIA_SMTP');
  });

  describe('smtpHost', () => {
    testToThrowOrReturn('smtpHost', 'SMTP_HOST');
  });

  describe('smtpPort', () => {
    testToHaveDefaultAndOverride('smtpPort', '587', 'SMTP_PORT');
  });

  describe('smtpTls', () => {
    testToHaveDefaultAndOverride('smtpTls', false, 'SMTP_TLS');
  });

  describe('smtpUser', () => {
    testToHaveDefaultAndOverride('smtpUser', undefined, 'SMTP_USER');
  });

  describe('smtpPassword', () => {
    testToHaveDefaultAndOverride('smtpPassword', undefined, 'SMTP_PASSWORD');
  });

  describe('smtpFrom', () => {
    testToHaveDefaultAndOverride('smtpFrom', undefined, 'SMTP_FROM');
  });

  describe('smtpTo', () => {
    testToThrowOrReturn('smtpTo', 'SMTP_TO');
  });

  describe('runOnce', () => {
    testToHaveDefaultAndOverride('runOnce', false, 'RUN_ONCE');
  });

  describe('intervalMinutes', () => {
    test('should return default value', () => {
      expect(Config.intervalMinutes).toStrictEqual(30);
    });

    test('should disregard bad values', async () => {
      process.env['INTERVAL_MINUTES'] = '-1';
      expect(Config.intervalMinutes).toStrictEqual(30);

      await resetImport();
      process.env['INTERVAL_MINUTES'] = 'abc';
      expect(Config.intervalMinutes).toStrictEqual(30);

      await resetImport();
      process.env['INTERVAL_MINUTES'] = '0';
      expect(Config.intervalMinutes).toStrictEqual(30);
    });

    test('should accept override and memoize', () => {
      process.env['INTERVAL_MINUTES'] = '5';

      expect(Config.intervalMinutes).toStrictEqual(5);
      resetEnv();
      expect(Config.intervalMinutes).toStrictEqual(5);
    });
  });

  describe('honeybadgerApiKey', () => {
    testToHaveDefaultAndOverride('honeybadgerApiKey', undefined, 'HONEYBADGER_API_KEY');
  });

  describe('sentryDsn', () => {
    testToHaveDefaultAndOverride('sentryDsn', undefined, 'SENTRY_DSN');
  });
});
