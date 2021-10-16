import React from 'react'
import Modal from '../../../components/Modal'
import {verifyVerificationCode} from '../../../components/api/apis'
// import axios from 'axios'

function CodeVerify(props) {
    console.log(props.message)
    let isVerified;
    if(props.message.includes('Wrong')){
        isVerified = false
    }else {
        isVerified = true
    }
    
    return (
        <div>
            <Modal verify={isVerified} title={'Verification Status'} content={props.message}/>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const code = context.params;
    const response = await verifyVerificationCode.post('/', {
        verification_code: code.verificationCode
    })

    console.log(response)
    
    return {
        props: {
            message: response.data.message
        }
    }
}

export default CodeVerify;

CodeVerify.getLayout = function PageLayout(page){
    return <>{page}</>
}