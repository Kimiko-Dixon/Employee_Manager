import TimeOffRequest from '../components/timeOffRequest'
import {useMutation,useQuery} from 'react-router-dom'
import {GET_ME, GET_TIMEOFFREQUESTS} from '../utils/queries'
import {CREATETIMEOFFREQUEST} from '../utils/mutations'
const TimeOffPage = () => {
    const {data} = useQuery(GET_ME)
    const [request] = useMutation(CREATETIMEOFFREQUEST)
    const user = data?.me || {}
    try{
        
    }
    catch(err){
        console.log(err)
    }
    return (
        /* {user.role === 'admin' ? (

        )
        :
        (
            <TimeOffRequest/>
        )} */
       <h1>time off page</h1>
        
    )
}

export default TimeOffPage