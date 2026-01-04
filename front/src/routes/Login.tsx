import { useState } from "react";
import Antigravity from "../components/Antigravity";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toLogin, type responseLogin } from "../data/Login";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const Login = async () => {
        try {
            setLoading(true);
            const body = { cpf, password }

            const res: responseLogin = await toLogin(body);

            if (!res.token) {
                setError("Erro ao fazer login. Verifique suas credenciais.");
                return;
            }

            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.id);
            localStorage.setItem("userName", res.name);
            localStorage.setItem("userEmail", res.email);
            localStorage.setItem("userRole", res.role);

            navigate("/home");
        } catch {
            setError("Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    }


    return (<>
        <main
            className="
                w-full h-[100vh] relative overflow-hidden
                bg-[radial-gradient(ellipse_at_bottom,_#1b2a6b_0%,_#0d1031_45%,_#050714_100%)]
                before:content-['']
                before:absolute before:inset-0
                before:bg-[radial-gradient(2px_2px_at_20%_30%,_rgba(255,255,255,0.8)_50%,_transparent_51%),radial-gradient(1.5px_1.5px_at_70%_60%,_rgba(255,255,255,0.6)_50%,_transparent_51%),radial-gradient(1px_1px_at_40%_80%,_rgba(255,255,255,0.5)_50%,_transparent_51%)]
                before:bg-[length:200px_200px]
                before:opacity-60
            "
        >
            <Antigravity
                count={1000}
                particleShape="sphere"
                magnetRadius={10}
                ringRadius={8}
                particleSize={0.5}
                autoAnimate={true}
                pulseSpeed={10}
                fieldStrength={7}
                color="#FF6AD5"
                className="w-full h-screen flex items-center justify-center"
            >
                {loading && <Loading />}
                <div className="flex backdrop-blur-3xl border border-white rounded-4xl h-[70vh] w-[60vw] z-10">
                    <div className="text-center h-full">
                        <img src="logoBank.png" alt="Logo Bank" className="h-full rounded-l-4xl border border-white" />
                    </div>
                    <form
                        className="flex justify-center items-center flex-col w-[44%] font-['Segoe_UI',sans-serif]"
                        onSubmit={e => { e.preventDefault(); Login(); }}
                    >

                        <h1 className="text-white text-4xl mb-10 font-['Segoe_UI',sans-serif] font-bold" >Login</h1>

                        <input
                            type="text"
                            required
                            autoComplete="off"
                            placeholder="Cpf"
                            className="inputs-star peer w-[90%] rounded-full border-2 border-gray-300 bg-transparent
                                px-4 py-3 text-base text-white outline-none transition focus:border-white"
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <div className="relative w-[90%] mt-6">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                autoComplete="off"
                                placeholder="Password"
                                className="inputs-star peer w-full rounded-full border-2 border-gray-300 bg-transparent
                                px-4 py-3 text-base text-white outline-none transition focus:border-white"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[50%] text-gray-500 hover:text-gray-700 eyesPassword"
                                style={{ transform: "translateY(-50%)" }}
                            >
                                {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                            </button>
                        </div>

                        <p className="text-red-600 mt-6 text-center">{error}</p>


                        <button
                            type="submit"
                            className="
                                group relative border-none bg-transparent p-0 cursor-pointer
                                outline-offset-4 outline-pink-600
                                transition-[filter] duration-250
                                [-webkit-tap-highlight-color:rgba(0,0,0,0)]
                                hover:brightness-110
                                focus:outline-none focus-visible:outline
                                mt-10 w-[80%]
                            "
                        >
                            {/* Shadow */}
                            <span
                                className="
                                    absolute top-0 left-0 h-full w-full rounded-lg
                                    bg-[hsl(226,25%,69%)]
                                    blur-[2px]
                                    translate-y-[2px]
                                    transition-transform duration-600
                                    [transition-timing-function:cubic-bezier(0.3,0.7,0.4,1)]
                                    group-hover:translate-y-[4px]
                                    group-hover:duration-250
                                    group-hover:[transition-timing-function:cubic-bezier(0.3,0.7,0.4,1.5)]
                                    group-active:translate-y-[1px]
                                    group-active:duration-[34ms]
                                    "
                            />

                            {/* Edge */}
                            <span
                                className="
                                absolute top-0 left-0 h-full w-full rounded-lg
                                bg-[linear-gradient(
                                    to_right,
                                    hsl(248,39%,39%)_0%,
                                    hsl(248,39%,49%)_8%,
                                    hsl(248,39%,39%)_92%,
                                    hsl(248,39%,29%)_100%
                                )]
                                "
                            />

                            {/* Front */}
                            <span
                                className="
                                    relative block rounded-lg
                                    bg-[hsl(248,53%,58%)]
                                    px-8 py-4
                                    text-white font-semibold uppercase tracking-[1.5px]
                                    text-base
                                    translate-y-[-4px]
                                    transition-transform duration-600
                                    [transition-timing-function:cubic-bezier(0.3,0.7,0.4,1)]
                                    group-hover:translate-y-[-6px]
                                    group-hover:duration-250
                                    group-hover:[transition-timing-function:cubic-bezier(0.3,0.7,0.4,1.5)]
                                    group-active:translate-y-[-2px]
                                    group-active:duration-[34ms]
                                    "
                            >
                                Login
                            </span>
                        </button>
                    </form>
                </div>

            </Antigravity>
        </main>
    </>)
}

export default Login;