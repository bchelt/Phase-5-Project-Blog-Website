# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create({ username: 'admin', password: 'password', password_confirmation: 'password', full_name: 'full name', bio: 'testing'})
tag1 = Tag.create({ category: 'Technology' })
tag2 = Tag.create({ category: 'Money' })
tag3 = Tag.create({ category: 'Business' })
tag4 = Tag.create({ category: 'Art' })
post = Post.create({ title: 'Test Post', content: 'This is a test post ..............................', summary: 'This...', user_id: user.id })