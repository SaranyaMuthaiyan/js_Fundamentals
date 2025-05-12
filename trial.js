const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

const getUniqueLearnerIds = (submissions) => {
    let learnerIds = []
    submissions.forEach(learner => {
        let id = learner.learner_id;
        if (learnerIds.indexOf(id) === -1) learnerIds.push(id);
    })

    return learnerIds;
}

const getScoresAndAvg = (learnerId, submissions, groups) => {
    const assignments = submissions.filter(submission => submission.learner_id === learnerId);
    let scores = {}
    let totalScore = 0;
    let totalPointsPossible = 0;
    assignments.forEach(assignment => {
        const id = assignment.assignment_id;
        const assignmentGroup = groups.assignments.filter(group => group.id === id);
        const pointsPossible = assignmentGroup[0].points_possible;
        const dueDate = new Date(assignmentGroup[0].due_at);
        const submittedDate = new Date(assignment.submission.submitted_at);
        let score = assignment.submission.score;
        if (submittedDate > dueDate) {
            score = score - 10;
        }

        totalScore = totalScore + score;
        totalPointsPossible = totalPointsPossible + pointsPossible;

        scores[id] = Math.floor((score / pointsPossible) * 100) / 100;
    })

    scores.avg = Math.floor((totalScore / totalPointsPossible) * 100) / 100;

    return scores;
}

const getLearnerData = (CourseInfo, AssignmentGroup, LearnerSubmissions) => {
    const uniqueIds = getUniqueLearnerIds(LearnerSubmissions);
    const learnerData = uniqueIds.map(learner_id => {
        const scoresAndAvg = getScoresAndAvg(learner_id, LearnerSubmissions, AssignmentGroup);
        return { id: learner_id, ...scoresAndAvg }
    })

    return learnerData;
}

const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(results);




