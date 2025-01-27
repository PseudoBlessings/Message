const { logDeveloperMode, developerMode, env } = require('./debug.js');


test('logDeveloperMode', () => {
    expect(logDeveloperMode('Testing logDeveloperMode')).toBe('Testing logDeveloperMode');
});

test('developerMode', () => {
    expect(developerMode()).toBe(true);
});

test('env', () => {
    expect(env).toBe('development');
});