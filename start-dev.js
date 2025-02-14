const { spawn } = require('child_process');

// Rails サーバーを起動 (3000番ポート)
const rails = spawn('bundle', ['exec', 'rails', 'server', '-p', '3000'], { 
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, RAILS_ENV: 'development' }  // 環境変数を明示的に設定
});

// React開発サーバーを起動 (3001番ポート)
const react = spawn('npm', ['start'], {
  shell: true,
  stdio: 'inherit',
  cwd: 'app/frontend',
  env: { ...process.env, PORT: '3001' }  // 環境変数でポートを設定
});

// プロセス終了時の処理
const cleanup = () => {
  console.log('\nShutting down servers...');
  rails.kill();
  react.kill();
  
  setTimeout(() => {
    process.exit(0);
  }, 1000);
};

// シグナルハンドリング
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// エラーハンドリング
rails.on('error', (err) => {
  console.error('Rails server error:', err);
});

react.on('error', (err) => {
  console.error('React server error:', err);
});

console.log('Development servers starting...');
console.log('Rails server: http://localhost:3000');
console.log('React server: http://localhost:3001');