import React,{useState} from "react";
import {Link,useNavigate,useNavigate} from "react-router-dom"
const SingUp  = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    }); 

    const navigate = useNavigate()
    const codeResendTime = 60;//60秒後にまた再送信可能
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]:value });
    }
    const codeRecieve = async (e) => { //# app/services/verification_code_service.rb

    }
    return (
        <div className="formFiled">
            <form onSubmit={}> {/* railsのuserコントローラーに情報を送信する*/}
                <div className="inputUserName">
                    <label className="userName">ユーザー名</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input Name"
                    required
                    />

                </div>

            </form>
            <div className=""></div>
        </div>
    );

} 