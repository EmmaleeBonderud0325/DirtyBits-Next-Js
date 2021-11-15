import axios from 'axios';
import Panel2 from '../../components/ProblemPage/Panel2'
import {getProblem} from '../../components/api/apis'
import Head from 'next/head'

function ProblemView({data}) {
    console.log('data', data)
    return (
        <>
            <Head>
                <title>New Year Chaos</title>
            </Head>
            <div>
                <Panel2 question={data}/>
            </div>
        </>
    )
}

export default ProblemView;

export const getServerSideProps = async (ctx) => {
    const {data} = await getProblem.post('/', {
        id: "6"
    })

    console.log(data)

    return {
        props: {
            data
        }
    }
}