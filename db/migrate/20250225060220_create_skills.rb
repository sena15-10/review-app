class CreateSkills < ActiveRecord::Migration[8.0]
  def change
    create_table :skills do |t|
      t.string :name, null: false         # スキル名 (例: "JavaScript", "Rails", "PostgreSQL")
      t.string :category, null: false     # カテゴリ ("language", "framework", "database", "tool")
      t.timestamps

    end
  end
end
