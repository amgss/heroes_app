import { AuthProvider } from './auth/context';
import { AppRouter } from './router/AppRouter';

export const HeroesApp = () => {
    return (
        <AuthProvider>
            <h1>HeroesApp</h1>
            <AppRouter/>
        </AuthProvider>
    )
}
