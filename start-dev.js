const { spawn } = require('child_process');

// Rails サーバーを起動
const rails = spawn('bundle', ['exec', 'rails', 'server', '-p', '3000'], { 
  stdio: 'inherit',
  shell: true
});

// React開発サーバーを起動（'dev' から 'start' に変更）
const react = spawn('npm', ['start'], {
  shell: true,
  stdio: 'inherit',
  cwd: 'app/frontend'  // フロントエンドのディレクトリパスを確認
});

// プロセス終了時の処理
const cleanup = () => {
  console.log('\nShutting down servers...');
  rails.kill();
  react.kill();
  
  // 強制終了のタイムアウトを設定
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