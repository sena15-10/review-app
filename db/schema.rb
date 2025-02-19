# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_04_055430) do
  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", limit: 255, null: false
    t.string "password_digest", null: false
    t.string "reset_password_token"
    t.boolean "admin", default: false
    t.boolean "is_ban", default: false
    t.datetime "confirmed_at"
    t.datetime "last_login_at"
    t.datetime "ban_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["last_login_at"], name: "index_users_on_last_login_at"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "verification_codes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "code"
    t.datetime "expires_at"
    t.datetime "last_sent_at"
    t.boolean "verified"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_verification_codes_on_user_id"
  end

  add_foreign_key "verification_codes", "users"
end
