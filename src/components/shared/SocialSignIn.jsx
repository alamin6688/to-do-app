'use client'
import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SocialSignIn = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleSocialLogin = async (provider) => {
        const res = await signIn(provider, { redirect: false });

        if (res?.error) {
            console.error('Error signing in:', res.error);
        } else if (res?.ok && status === 'authenticated') {
            router.push('/');
        }
    };


    useEffect(() => {
        if (status === 'authenticated') {
            toast.success("Seccessfully logged in")
            router.push('/');
        }
    }, [status, router]);
    return (
        <div className="flex gap-5 items-center justify-center">
            <button onClick={() => handleSocialLogin('google')} className='bg-[#F5F5F8] p-4 rounded-full'><FcGoogle /></button>
            <button onClick={() => handleSocialLogin('github')} className='bg-[#F5F5F8] p-4 rounded-full'><FaGithub /></button>
        </div>
    );
};

export default SocialSignIn;