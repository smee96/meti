#!/usr/bin/env node
/**
 * Design Tokens to CSS Variables Converter
 * Figma Design Tokens (JSON) → CSS Variables
 */

const fs = require('fs');
const path = require('path');

// 인자 확인
const [,, tokensPath, outputPath] = process.argv;

if (!tokensPath || !outputPath) {
  console.error('❌ Error: 인자가 부족합니다');
  console.log('사용법: node tokens-to-css.js <tokens.json> <output.css>');
  process.exit(1);
}

if (!fs.existsSync(tokensPath)) {
  console.error(`❌ Error: 파일을 찾을 수 없습니다: ${tokensPath}`);
  process.exit(1);
}

// Tokens 읽기
console.log('📖 Design Tokens 읽는 중...');
const tokensRaw = fs.readFileSync(tokensPath, 'utf8');
const tokens = JSON.parse(tokensRaw);

// CSS Variables 생성
console.log('🎨 CSS Variables 생성 중...');

let css = `/**
 * Design Tokens (Auto-generated)
 * Generated at: ${new Date().toISOString()}
 * Source: ${path.basename(tokensPath)}
 */

:root {
`;

// Colors
if (tokens.colors) {
  css += '\n  /* Colors */\n';
  for (const [name, value] of Object.entries(tokens.colors)) {
    const varName = `--color-${name.toLowerCase().replace(/\s+/g, '-')}`;
    css += `  ${varName}: ${value};\n`;
  }
}

// Typography
if (tokens.typography) {
  css += '\n  /* Typography */\n';
  
  if (tokens.typography.fontFamilies) {
    for (const [name, value] of Object.entries(tokens.typography.fontFamilies)) {
      const varName = `--font-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${varName}: ${value};\n`;
    }
  }
  
  if (tokens.typography.fontSizes) {
    for (const [name, value] of Object.entries(tokens.typography.fontSizes)) {
      const varName = `--font-size-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${varName}: ${value};\n`;
    }
  }
  
  if (tokens.typography.fontWeights) {
    for (const [name, value] of Object.entries(tokens.typography.fontWeights)) {
      const varName = `--font-weight-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${varName}: ${value};\n`;
    }
  }
  
  if (tokens.typography.lineHeights) {
    for (const [name, value] of Object.entries(tokens.typography.lineHeights)) {
      const varName = `--line-height-${name.toLowerCase().replace(/\s+/g, '-')}`;
      css += `  ${varName}: ${value};\n`;
    }
  }
}

// Spacing
if (tokens.spacing) {
  css += '\n  /* Spacing */\n';
  for (const [name, value] of Object.entries(tokens.spacing)) {
    const varName = `--spacing-${name.toLowerCase().replace(/\s+/g, '-')}`;
    css += `  ${varName}: ${value};\n`;
  }
}

// Border Radius
if (tokens.borderRadius) {
  css += '\n  /* Border Radius */\n';
  for (const [name, value] of Object.entries(tokens.borderRadius)) {
    const varName = `--radius-${name.toLowerCase().replace(/\s+/g, '-')}`;
    css += `  ${varName}: ${value};\n`;
  }
}

// Shadows
if (tokens.shadows) {
  css += '\n  /* Shadows */\n';
  for (const [name, value] of Object.entries(tokens.shadows)) {
    const varName = `--shadow-${name.toLowerCase().replace(/\s+/g, '-')}`;
    css += `  ${varName}: ${value};\n`;
  }
}

css += '}\n';

// Dark Mode (있는 경우)
if (tokens.darkMode) {
  css += `
[data-theme="dark"] {
`;
  for (const [name, value] of Object.entries(tokens.darkMode)) {
    const varName = `--color-${name.toLowerCase().replace(/\s+/g, '-')}`;
    css += `  ${varName}: ${value};\n`;
  }
  css += '}\n';
}

// CSS 파일 저장
console.log(`💾 CSS 파일 저장 중: ${outputPath}`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, css, 'utf8');

console.log('✅ 변환 완료!');
console.log(`📄 생성된 파일: ${outputPath}`);
console.log(`📊 생성된 CSS Variables: ${(css.match(/--/g) || []).length}개`);
