module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      // startServerCommand: 'npm start',
      // url: ['http://localhost:8080'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
