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
//part 1:get unique id
let learners = []
LearnerSubmissions.forEach(learner => {
    let newArray = learner.learner_id

    if (learners.indexOf(newArray) === -1) {
        learners.push(newArray)
    }

})
let obj = learners.map(learner => {
    return { id: learner }
})
//console.log(learners)
console.log(obj)

//part 3 get assignment  and find grade and get each student score

let obj2 = learners.map(learner => {
    let results = LearnerSubmissions.filter(student => {
        return student.learner_id === learner
    })

    let scores = {};
    results.forEach(res => {
        return scores[res.assignment_id] = res.submission.score;
    })

    return { id: learner, ...scores }
})
console.log(obj2)

// part 4

let obj3 = learners.map(learner => {
    let results = LearnerSubmissions.filter(student => {
        return student.learner_id === learner
    })

    let scores = {};
    //let totalScore = 0;
    //let totalPointPossible = 0;
    results.forEach(res => {
        const res01 = AssignmentGroup.assignments.filter(assmt => assmt.id === res.assignment_id);
        const points_possible = res01[0].points_possible;

         //totalScore = totalScore + res.submission.score;
         //totalPointPossible = totalPointPossible + points_possible

        return scores[res.assignment_id] = res.submission.score / points_possible;
    })

    return { id: learner, ...scores }
    //return { id: learner, ...scores, avg: totalScore / totalPointPossible }
})
console.log(obj3)




