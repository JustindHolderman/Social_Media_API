const userData = [
    {
        username: 'user1',
        email: 'test@test.com'
    },
    {
        username: 'user2',
        email: 'test1@test.com'
    },
    {
        username: 'user3',
        email: 'test2@test.com'
    },
    {
        username: 'user4',
        email: 'test3@test.com'
    },
    {
        username: 'user5',
        email: 'test4@test.com'
    },
    {
        username: 'user6',
        email: 'test5@test.com'
    },
    {
        username: 'user7',
        email: 'test6@test.com'
    },
    {
        username: 'user8',
        email: 'test7@test.com'
    },
    {
        username: 'user9',
        email: 'test8@test.com'
    },
    {
        username: 'user10',
        email: 'test9@test.com'
    },
]

const thoughtData = [
    {
        thoughtText: "What is a thought?",
        username: "user1",
        reactions: [
            {
                reactionBody: "I don't know",
                username: "user2"
            },
            {
                reactionBody: "I do know",
                username: "user3"
            }
        ]
    },
    {
        thoughtText: "Why is a thought?",
        username: "user2",
        reactions: [
            {
                reactionBody: "I need to know",
                username: "user4"
            },
            {
                reactionBody: "I don't need to know",
                username: "user5"
            }
        ]
    },
    {
        thoughtText: "When is a thought?",
        username: "user3",
        reactions: [
            {
                reactionBody: "I already know",
                username: "user6"
            },
            {
                reactionBody: "I will know",
                username: "user7"
            }
        ]
    }
]

const randomIndex = (arr) => {return Math.floor(Math.random() * arr.length);}

module.exports = { userData, thoughtData, randomIndex };