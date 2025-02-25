class CreateSocialLinks < ActiveRecord::Migration[8.0]
  def change
    create_table :social_links do |t|
      t.references :profile, null: false, foreign_key: true
      t.string :name
      t.string :url
      t.timestamps
    end
  end
end
