import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

export default function LoginScreen() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
       e.preventDefault();
       dispatch(signin(username, password));
    }
    return (
        <div className="login-container">
            <div className="card">
                <div className="card__header text-center">
                    <h2 className="card__title fw-600 title">LA CIABATTA</h2>
                </div>
                <span className="line"></span>
                <p className="text-center">Ingresar al sistema</p>
                <div className="card__body">
                    <form action="" onSubmit={submitHandler}>
                        <div className="form-group">
                            <i className='bx bxs-user' ></i>
                            <input type="text" id="username" placeholder="Ingrese Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <i className='bx bxs-lock-alt' ></i>
                            <input type="password" id="password" placeholder="Ingrese Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        
                            <button type="submit"  className="btn btn-success w-100 t ext-center">Ingresar</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
