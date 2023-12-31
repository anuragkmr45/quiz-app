import { IoCreateOutline, IoHomeOutline } from 'react-icons/io5'
import { FaRegPaste } from 'react-icons/fa6'
import { GrStatusGood } from 'react-icons/gr'
import { MdOutlineLibraryBooks } from "react-icons/md";

export const dashboardOption = [
    // {
    //     icon: <IoCreateOutline />,
    //     title:'Create New Quiz',
    //     subTitle: 'Create New Quiz',
    //     navigate: '/dashboard/create-quiz'
    // },
    {
        icon: <FaRegPaste />,
        title:'My Quizes',
        subTitle: 'Previous Quiz',
        navigate: '/dashboard/previous-quizes'
    },
    {
        icon: <GrStatusGood />,
        title:'Check Quiz Status ',
        subTitle: 'Check Quiz Status',
        navigate: '/dashboard/status-check'
    },
] 

export const dashboardRouting = [
    {
        icon: <IoHomeOutline />,
        title: 'Dashboard',
        navigate: '/dashboard',
    },
    {
        icon: <IoCreateOutline />,
        title: 'Create New Quiz',
        navigate: '/dashboard/add-quiz'
    },
    {
        icon: <FaRegPaste />,
        title: 'My Quizes',
        navigate: '/dashboard/previous-quizes'
    },
    {
        icon: <GrStatusGood />,
        title: 'Check Quiz Status ',
        navigate: '/dashboard/status-check'
    },
    {
        icon: <MdOutlineLibraryBooks />,
        title: 'Question Bank',
        navigate: '/dashboard/question-bank'
    },
]