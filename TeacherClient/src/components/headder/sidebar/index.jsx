import React from 'react'
import { Link } from 'react-router-dom';

import LogoutModal from '../../modals/logout-modal';

import { dashboardRouting } from '../../../.data/dashboard-options'

const SideBar = () => {
    return (
        <div style={{ height: '99vh' }}>

            {
                dashboardRouting.map((data, index) => {
                    return (
                        <Link key={index} to={data.navigate} className="d-flex justify-content-start my-lg-5" style={{ textDecoration: 'none' }} >
                            <div className="d-flex align-items-center my-auto mx-2" style={{ color: 'black' }} >
                                {data.icon}
                            </div>
                            <h5>{data.title}</h5>
                        </Link>
                    )
                })
            }
            <div style={{ position: 'absolute', bottom: '2rem', width: '22%' }} >
                <hr style={{ border: '1px solid black' }} />
                <LogoutModal />
            </div>
        </div>
    )
}

export default SideBar
