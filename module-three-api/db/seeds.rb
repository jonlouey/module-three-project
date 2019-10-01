# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Question.destroy_all
Category.create(name: "state_capitals")
states = [
	{ answer: 'Montgomery', question: 'Alabama', category: Category.first },
	{ answer: 'Juneau', question: 'Alaska', category: Category.first },
	{ answer: 'Phoenix', question: 'Arizona', category: Category.first },
	{ answer: 'Little Rock', question: 'Arkansas', category: Category.first },
	{ answer: 'Sacramento', question: 'California', category: Category.first },
	{ answer: 'Denver', question: 'Colorado', category: Category.first },
	{ answer: 'Hartford', question: 'Connecticut', category: Category.first },
	{ answer: 'Dover', question: 'Delaware', category: Category.first },
	{ answer: 'Tallahassee', question: 'Floria', category: Category.first },
	{ answer: 'Atlanta', question: 'Georgia', category: Category.first },
	{ answer: 'Honolulu', question: 'Hawaii', category: Category.first },
	{ answer: 'Boise', question: 'Idaho', category: Category.first },
	{ answer: 'Springfield', question: 'Illinois', category: Category.first },
	{ answer: 'Indianapolis', question: 'Indiana', category: Category.first },
	{ answer: 'Des Moines', question: 'Iowa', category: Category.first },
	{ answer: 'Topeka', question: 'Kansas', category: Category.first },
	{ answer: 'Frankfort', question: 'Kentucky', category: Category.first },
	{ answer: 'Baton Rouge', question: 'Louisiana', category: Category.first },
	{ answer: 'Augusta', question: 'Maine', category: Category.first },
	{ answer: 'Annapolis', question: 'Maryland', category: Category.first },
	{ answer: 'Boston', question: 'Massachusetts', category: Category.first },
	{ answer: 'Lansing', question: 'Michigan', category: Category.first },
	{ answer: 'Saint Paul', question: 'Minnesota', category: Category.first },
	{ answer: 'Jackson', question: 'Mississippi', category: Category.first },
	{ answer: 'Jefferson City', question: 'Missouri', category: Category.first },
	{ answer: 'Helena', question: 'Montana', category: Category.first },
	{ answer: 'Lincoln', question: 'Nebraska', category: Category.first },
	{ answer: 'Carson City', question: 'Nevada', category: Category.first },
	{ answer: 'Concord', question: 'New Hampshire', category: Category.first },
	{ answer: 'Trenton', question: 'New Jersey', category: Category.first },
	{ answer: 'Santa Fe', question: 'New Mexico', category: Category.first },
	{ answer: 'Albany', question: 'New York', category: Category.first },
	{ answer: 'Raleigh', question: 'North Carolina', category: Category.first },
	{ answer: 'Bismarck', question: 'North Dakota', category: Category.first },
	{ answer: 'Columbus', question: 'Ohio', category: Category.first },
	{ answer: 'Oklahoma City', question: 'Oklahoma', category: Category.first },
	{ answer: 'Salem', question: 'Oregon', category: Category.first },
	{ answer: 'Harrisburg', question: 'Pennsylvania', category: Category.first },
	{ answer: 'Providence', question: 'Rhode Island', category: Category.first },
	{ answer: 'Columbia', question: 'South Carolina', category: Category.first },
	{ answer: 'Pierre', question: 'South Dakota', category: Category.first },
	{ answer: 'Nashville', question: 'Tennessee', category: Category.first },
	{ answer: 'Austin', question: 'Texas', category: Category.first },
	{ answer: 'Salt Lake City', question: 'Utah', category: Category.first },
	{ answer: 'Montpelier', question: 'Vermont', category: Category.first },
	{ answer: 'Richmond', question: 'Virginia', category: Category.first },
	{ answer: 'Olympia', question: 'Washington', category: Category.first },
	{ answer: 'Charleston', question: 'West Virginia', category: Category.first },
	{ answer: 'Madison', question: 'Wisconsin', category: Category.first },
	{ answer: 'Cheyenne', question: 'Wyoming', category: Category.first }
]
states.each do |state|
    Question.create!(state)
end

