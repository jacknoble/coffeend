# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140314042746) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendances", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "hangout_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "attendances", ["hangout_id", "user_id"], name: "index_attendances_on_hangout_id_and_user_id", unique: true, using: :btree

  create_table "delayed_jobs", force: true do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "hangouts", force: true do |t|
    t.integer  "user_id",       null: false
    t.datetime "start",         null: false
    t.datetime "end"
    t.string   "location_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "lat"
    t.float    "lng"
    t.text     "description"
  end

  add_index "hangouts", ["location_name"], name: "index_hangouts_on_location_name", using: :btree
  add_index "hangouts", ["start"], name: "index_hangouts_on_start", using: :btree
  add_index "hangouts", ["user_id"], name: "index_hangouts_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",              null: false
    t.string   "first_name",         null: false
    t.string   "last_name"
    t.string   "job"
    t.integer  "age"
    t.string   "sex"
    t.text     "self_summary"
    t.string   "session_token"
    t.string   "password_digest",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
