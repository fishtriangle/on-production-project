import { getQueryParamsString } from './addQueryParams';

describe('shared/lib/url/addQueryParams', () => {
  it('should add one query param', () => {
    const params = getQueryParamsString({
      test: 'value',
    });
    expect(params).toBe('?test=value');
  });

  it('should add two query params', () => {
    const params = {
      a: '1',
      b: '2',
    };
    const result = getQueryParamsString(params);
    expect(result).toBe('?a=1&b=2');
  });

  it('test with undefined', () => {
    const params = {
      a: '1',
      b: undefined,
    };
    const result = getQueryParamsString(params);
    expect(result).toBe('?a=1');
  });
});
