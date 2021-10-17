import React from 'react'
import Modal from '../../components/Modal'
import Head from 'next/head'
import sucess from '../../public/success.png'

function registered() {
    return (
        <>
        <body className="bg-[#080015]">

        <div>
            <Head>
                <title>Register</title>
            </Head>
            <Modal source={sucess} verify={true} title={"Registered Succesfully"} content={'A verfication e-mail has been sent to your registered email address'}/>
        </div>
        </body>
        </>
    )
}

export default registered

registered.getLayout = function PageLayout(page) {
    return <>{page}</>;
};