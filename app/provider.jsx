'use client'
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import { User } from 'lucide-react';
import React, { useState, useEffect, use, useContext } from 'react'

function Provider({children}) {
  const [user, setUser] = useState();

    useEffect(() => {
        createNewUser();
    }, [])

    const createNewUser = async () => {
        supabase.auth.getUser().then(async({data:{user}}) => {
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email);
            console.log(Users);
            if (Users?.length == 0) {
                const {data , error } = await supabase.from('Users')
                    .insert([
                    {
                        email: user?.email,
                        name: user?.user_metadata.name,
                        picture: user?.user_metadata.picture,
                    }
                ])
                console.log(data);
                setUser(data);
                return;
            }
            setUser(Users[0]);
            console.log(Users);
        })
    }

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
    
  )
}

export default Provider;
export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
}