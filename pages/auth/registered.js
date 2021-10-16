import React from 'react'
import Modal from '../../components/Modal'

function registered() {
    return (
        <div>
            <Modal/>
        </div>
    )
}

export default registered

registered.getLayout = function PageLayout(page) {
    return <>{page}</>;
};