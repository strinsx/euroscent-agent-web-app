
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'


export default async function ProtectedRoute() {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
    const navigate = useNavigate('/login')
    useEffect(() => {

        try {

            if (!token && !user) {
                alert('access denied!')
                navigate('/login')
            }


        } catch (error) {
            console.error(error)
        }
    }, [])

}

