class CreateSocialLinks < ActiveRecord::Migration[8.0]
  def change
    create_table :social_links do |t|
      t.references :profile, null: false, foreign_key: true
      t.string :platform, null: false # モデルに合わせて :name から :platform に変更、null: false を追加
      t.string :url, null: false      # モデルのバリデーションに合わせて null: false を追加
      t.timestamps
    end

    # プロフィールごとにプラットフォーム名がユニークになるようにインデックスを追加
    add_index :social_links, [:profile_id, :platform], unique: true

    # URLの形式をチェックする制約
    add_check_constraint :social_links, "(url LIKE 'http://%' OR url LIKE 'https://%')", name: "check_url_format"
  end
end
