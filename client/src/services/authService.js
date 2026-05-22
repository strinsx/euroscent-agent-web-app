export default async function useAuth() {

    const token = localStorage.getItem('token');

    if (!token) {
        return {
            isAuthenticated: false
        };
    }

    try {

        const res = await fetch('https://euroscent-agent-web-app-server.onrender.com/api/auth/protect', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status === 401) {

            localStorage.removeItem('token');

            return {
                isAuthenticated: false
            };
        }

        const data = await res.json();

        return {
            isAuthenticated: true,
            user: data.user
        };

    } catch (error) {

        return {
            isAuthenticated: false
        };
    }
}