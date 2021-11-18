// import axios from 'axios';
import Panel2 from '../../../components/ProblemPage/Panel2'
import {getProblem} from '../../../components/api/apis'
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
    console.log('ctx', ctx.params)
    console.log('query', ctx.query)
    console.log('id', ctx.query.id)
    const {data} = await getProblem.post('/', {
        id: ctx.query.id
    })

    console.log(data)

    return {
        props: {
            data
        }
    }
}