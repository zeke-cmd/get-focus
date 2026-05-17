describe('theme', () => {
  it('should export correct font families', () => {
    const { fonts } = require('../lib/theme');
    expect(fonts.logo).toBe('Unbounded');
    expect(fonts.heading).toBe('JosefinSans');
    expect(fonts.body).toBe('Montserrat');
  });

  it('should export consistent spacing values', () => {
    const { spacing } = require('../lib/theme');
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.base).toBe(16);
    expect(spacing.xl).toBe(24);
  });
});
