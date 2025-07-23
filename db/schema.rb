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

ActiveRecord::Schema[8.0].define(version: 2025_04_16_000000) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "certifications", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.string "name", null: false
    t.string "issuing_organization"
    t.date "issued_on"
    t.date "expires_on"
    t.string "credential_id"
    t.string "credential_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id"], name: "index_certifications_on_profile_id"
  end

  create_table "profile_skills", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.integer "skill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id"], name: "index_profile_skills_on_profile_id"
    t.index ["skill_id"], name: "index_profile_skills_on_skill_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.text "introduction", limit: 10000
    t.boolean "is_public", default: true
    t.integer "show_user"
    t.string "employment_status"
    t.string "experience_level"
    t.integer "years_of_experience"
    t.string "current_school"
    t.string "current_company"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["is_public"], name: "index_profiles_on_is_public"
    t.index ["user_id"], name: "index_profiles_on_user_id"
    t.check_constraint "years_of_experience >= 0", name: "check_valid_years"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name", null: false
    t.string "category", null: false
    t.string "experience_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "category"], name: "index_skills_on_name_and_category", unique: true
  end

  create_table "social_links", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.string "platform", null: false
    t.string "url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id", "platform"], name: "index_social_links_on_profile_id_and_platform", unique: true
    t.index ["profile_id"], name: "index_social_links_on_profile_id"
    t.check_constraint "(url LIKE 'http://%' OR url LIKE 'https://%')", name: "check_url_format"
  end

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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "certifications", "profiles"
  add_foreign_key "profile_skills", "profiles"
  add_foreign_key "profile_skills", "skills"
  add_foreign_key "profiles", "users"
  add_foreign_key "social_links", "profiles"
  add_foreign_key "verification_codes", "users"
end
