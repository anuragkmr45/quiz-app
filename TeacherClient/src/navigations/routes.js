import Home from '../page'

import Login from '../page/auth/login'
import Register from '../page/auth/register'

import Dashboard from '../page/dashboard'
import AddQuiz from '../page/dashboard/quiz/add-quiz'
import LiveQuiz from '../page/dashboard/quiz/live-quize'
import MyQuizes from '../page/dashboard/quiz/my-quize'
import QuestionBank from '../page/dashboard/quiz/question-bank'

export const routes = [
    {
        element:<Home /> ,
        path: '/',
    },
    {
        element: <Login />,
        path: '/teacher-login',
    },
    {
        element: <Register />,
        path: '/teacher-register',
    },

]

export const dashboardRoutes = [
    {
        element: <Dashboard />,
        path: '/dashboard',
    },
    {
        element: <AddQuiz />,
        path: '/dashboard/add-quiz',
    },
    {
        element: <LiveQuiz />,
        path: '/dashboard/status-check',
    },
    {
        element: <MyQuizes />,
        path: '/dashboard/previous-quizes',
    },
    {
        element: <QuestionBank />,
        path: '/dashboard/question-bank',
    },
]