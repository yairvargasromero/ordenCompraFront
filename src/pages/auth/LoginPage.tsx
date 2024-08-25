
import { LoginForm } from './ui/LoginForm';


export const LoginPage =()=> {
  return (
    
    <div className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto min-h-screen pt-32 sm:pt-52">

      <h1 className={ ` text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}