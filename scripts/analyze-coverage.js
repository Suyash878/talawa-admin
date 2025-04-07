import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const coverageReportPath = join(__dirname, '../coverage-report.json');
const coverageThreshold = 80; // Configurable threshold

try {
  const coverageData = JSON.parse(readFileSync(coverageReportPath, 'utf8'));
  const untestedComponents = [];

  Object.entries(coverageData).forEach(([filePath, coverage]) => {
    // Vitest coverage format differs from Jest
    const lineCoverage = coverage.statementMap ? {
      covered: Object.values(coverage.s).filter(v => v > 0).length,
      total: Object.keys(coverage.s).length
    } : {
      covered: 0,
      total: 0
    };

    const coveragePercentage = (lineCoverage.covered / lineCoverage.total) * 100;

    if (coveragePercentage < coverageThreshold) {
      untestedComponents.push({
        filePath,
        coveragePercentage: coveragePercentage.toFixed(2),
        lines: lineCoverage.total,
        coveredLines: lineCoverage.covered,
        statements: {
          covered: Object.values(coverage.s || {}).filter(v => v > 0).length,
          total: Object.keys(coverage.s || {}).length
        },
        branches: {
          covered: Object.values(coverage.b || {}).filter(v => v > 0).length,
          total: Object.keys(coverage.b || {}).length
        },
        functions: {
          covered: Object.values(coverage.f || {}).filter(v => v > 0).length,
          total: Object.keys(coverage.f || {}).length
        }
      });
    }
  });

  writeFileSync(
    join(__dirname, '../untested-components.json'), 
    JSON.stringify(untestedComponents, null, 2)
  );
  console.log('Untested components report generated: untested-components.json');
} catch (error) {
  console.error('Error analyzing coverage:', error.message);
  process.exit(1);
}