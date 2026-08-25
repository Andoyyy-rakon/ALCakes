import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(()=>{
        const code = searchParams.get('code');
        if(!code){
            navigate('/login',{replace:true});
            return;
        }

        supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
            if (error) {
            console.error('Auth callback error:', error.message);
            navigate('/login', { replace: true });
            } else {
            navigate('/', { replace: true });
            }
        });
    },[navigate,searchParams]);



    return(
        <div className="flex min-h-screen items-center justify-center bg-amber-50">
            <p className="text-black">Singning you in ...</p>
        </div>
    )


}
