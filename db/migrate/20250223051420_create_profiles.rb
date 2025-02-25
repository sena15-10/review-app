class CreateProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.text :introduction
      t.boolean :is_public, default: true
      t.string :employment_status
      t.string :experience_level
      t.integer :years_of_experience
      t.string :current_school
      t.string :current_company
      t.timestamps
    end
  end
end
