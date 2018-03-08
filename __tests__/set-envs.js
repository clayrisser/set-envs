import setEnvs, { getEnvFromMatch } from '../src';

describe('getEnvFromMatch(match)', () => {
  it('should return env value from match', () => {
    process.env.HELLO = 'world';
    const env = getEnvFromMatch('${HELLO}');
    expect(env).toBe(process.env.HELLO);
  });

  it("should return '' when env not set", () => {
    delete process.env.HELLO;
    const env = getEnvFromMatch('${HELLO}');
    expect(env).toBe('');
  });

  it("should return '' when empty match", () => {
    const env = getEnvFromMatch('${}');
    expect(env).toBe('');
  });

  it("should return '' when invalid match", () => {
    const env = getEnvFromMatch('$bye{hi}');
    expect(env).toBe('');
  });

  it('should return default value when env not set', () => {
    delete process.env.HELLO;
    const env = getEnvFromMatch('${HELLO:world}');
    expect(env).toBe('world');
  });
});

describe('setEnvs(configString)', () => {
  it('should replace matches with env values', () => {
    process.env.WORLD = 'world';
    process.env.STATE = 'Texas';
    const configString = 'Hello, ${WORLD} ${} Howdy, ${STATE} ${HOLA:bonjour}';
    const result = setEnvs(configString);
    expect(result).toBe('Hello, world ${} Howdy, Texas bonjour');
  });
});
