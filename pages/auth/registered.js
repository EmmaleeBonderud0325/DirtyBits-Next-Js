import React from 'react'
import Modal from '../../components/Modal'

function registered() {
    return (
        <div>
            <Modal title={"Registered Succesfully"} content={'A verfication e-mail has been sent to your registered email address'}/>
        </div>
    )
}

export default registered

registered.getLayout = function PageLayout(page) {
    return <>{page}</>;
};