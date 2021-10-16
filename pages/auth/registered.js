import React from 'react'
import Modal from '../../components/Modal'
import Head from 'next/head'

function registered() {
    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <Modal verify={true} title={"Registered Succesfully"} content={'A verfication e-mail has been sent to your registered email address'}/>
        </div>
    )
}

export default registered

registered.getLayout = function PageLayout(page) {
    return <>{page}</>;
};