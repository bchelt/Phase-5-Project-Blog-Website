class AddDefaultBioToUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :bio, from: nil, to: "No bio"
  end
end
