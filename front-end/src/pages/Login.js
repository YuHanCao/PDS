import styles from './Home.module.css'
import GoogleLogin from "react-google-login";
import Axios from "axios";

function Login() {
    const handleLogin = async googleData => {
        const tokenId = googleData.tokenId
        console.log(googleData)
        console.log(tokenId)

        try {
            const {data} = await Axios.post(`http://localhost:3030/googleLogin`, {
                token: tokenId
            });
            const user = data.user[0]
            console.log(data)

            if(user){
                window.localStorage.setItem("@user_email", user.email)
                window.localStorage.setItem("@user_name", user.nome)
                window.localStorage.setItem("@user_cargo", user.cargo)

            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <GoogleLogin
                clientId={"1010290390610-ft46t2lr0ll07vl1vk427d8ctqcjaplj.apps.googleusercontent.com"}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
            />
        </div>
    );
}

export default Login;