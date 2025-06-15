
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/dashboard',
        'http://localhost:8080/transactions',
        'http://localhost:8080/analytics',
      ],
      startServerCommand: 'npm run dev',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:pwa': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
