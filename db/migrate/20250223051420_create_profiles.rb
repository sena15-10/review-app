class CreateProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.text :introduction, limit: 10000
      t.boolean :is_public, default: true
      t.integer :show_user # 目的に応じて型や名前、デフォルト値を見直してください
      t.string :employment_status
      t.string :experience_level
      t.integer :years_of_experience
      t.string :current_school
      t.string :current_company
      t.timestamps
    end
    add_index :profiles, :is_public
    # 年数制約（負にならないようにする）
    add_check_constraint :profiles, "years_of_experience >= 0", name: "check_valid_years"

  end
end
