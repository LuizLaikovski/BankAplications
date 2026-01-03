import { Link } from "react-router";

const ErrorPage = () => {
    return(
        <div className="flex justify-center items-center flex-col">
            <h1>Rota invalida, retorne para o home</h1>
            <Link to='/' className="text-red-600 cursor-pointer" >Home</Link>
        </div>
    );
}
 
export default ErrorPage;