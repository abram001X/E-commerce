import { useParams } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';

export default function Acces(){
    const {acces} = useParams()
    return (
        <main className='flex-1 justify-center items-center min-h-screen flex'>
            <section className='border p-6 flex rounded-md bg-white'>
                {acces  == 'register' ? <SignUp/> : <Login/>}
            </section>
        </main>
    )
}