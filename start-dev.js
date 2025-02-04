const { spawn } = require('child_process');

// Rails サーバーを起動（bundle exec を使用）
const rails = spawn('bundle', ['exec', 'rails', 'server', '-p', '3000'], { 
  stdio: 'inherit',
  shell: true  // Windows 環境では必要
});

// React開発サーバーを起動
const react = spawn('npm', ['start'], {
  shell: true,
  stdio: 'inherit',
  cwd: 'app/frontend'
});

// プロセス終了時の処理
process.on('SIGINT', () => {
  rails.kill();
  react.kill();
  process.exit();
});

// エラーハンドリングの追加
rails.on('error', (err) => {
  console.error('Rails server error:', err);
});

react.on('error', (err) => {
  console.error('React server error:', err);
});