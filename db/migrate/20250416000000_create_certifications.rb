class CreateCertifications < ActiveRecord::Migration[8.0]
  def change
    create_table :certifications do |t|
      t.references :profile, null: false, foreign_key: true # プロフィールへの参照
      t.string :name, null: false                           # 資格・検定名
      t.string :issuing_organization                       # 発行組織
      t.date :issued_on                                    # 取得日
      t.date :expires_on                                   # 有効期限 (任意)
      t.string :credential_id                              # 認定ID (任意)
      t.string :credential_url                             # 証明URL (任意)
      
      t.timestamps
    end

    # 必要に応じてインデックスを追加できます
    # 例: add_index :certifications, :name
    # 例: add_index :certifications, [:profile_id, :name], unique: true # プロフィールごとに資格名はユニークにする場合
  end
end