import { useParams } from 'react-router-dom';
import SignIn from './SignIn';
import Login from './Login';

export default function Acces(){
    const {acces} = useParams()
    return (
        <main className='flex-1 justify-center items-center min-h-screen flex'>
            <section className='border p-6 flex rounded-md bg-white'>
                {acces  == 'register' ? <SignIn/> : <Login/>}
            </section>
        </main>
    )
}