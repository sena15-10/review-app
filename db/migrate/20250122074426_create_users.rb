class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string  :name, null: false
      t.string  :email, null: false, limit: 255
      t.index   :email, unique: true
      t.string  :password_digest, null: false # パスワードの最大文字数を制限
      t.string  :reset_password_token # パスワードリセット用トークン
      t.boolean :admin, default: false # 管理者フラグ
      t.boolean :is_ban, default: false # アカウント停止フラグ
      t.datetime :confirmed_at # メール認証日時
      t.datetime :last_login_at # 最終ログイン日時
      t.datetime :ban_at
      t.timestamps
    end
    add_index :users, :reset_password_token, unique: true # パスワードリセット用トークンのインデックス
    add_index :users, :last_login_at # 最終ログイン日時のインデックスを追加
  end
end
