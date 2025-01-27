const {Login, handleNavigationEvent, handleLoginPageLoad, loadLoginPage} = require('./login.js');
const {logDeveloperMode} = require('./debug.js');

test('logDeveloperMode', () => {
    expect(logDeveloperMode('Testing logDeveloperMode')).toBe('Testing logDeveloperMode');
});

test('Login', () => {
    expect(Login()).toBe(undefined);
});

test('handleNavigationEvent', () => {
    expect(handleNavigationEvent()).toBe(undefined);
});

test('handleLoginPageLoad', () => {
    expect(handleLoginPageLoad()).toBe(undefined);
});

test('loadLoginPage', () => {
    expect(loadLoginPage()).toBe(undefined);
});