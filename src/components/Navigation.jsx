import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { signout } from "../actions/userActions";

export default function Navigation() {

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
     dispatch(signout());
  }

  return (
    <div>
      <header>
        <nav>
            <button className="btn-menu">
                <i className='bx bx-menu' ></i>
            </button>
            <Link to="/" onClick={signoutHandler} className="btn-menu">
              <div className="flex">
                <p className="mr-10">{userInfo.name}</p>
                 <i className='bx bx-log-in' ></i>
              </div>
            </Link>
        </nav>
      </header>
      <aside className="card">
        <ul className="aside__list">
            <li className="aside__list-item"><i className='bx bxs-home' ></i> <Link to="/"> Inicio </Link></li>
            <li className="aside__list-item"><i className='bx bxs-user' ></i> <Link to="/users">Usuarios </Link></li>
            <li className="aside__list-item"><i className='bx bxs-category' ></i> <Link to="/categories"> Categorias </Link></li>
            <li className="aside__list-item"><i className='bx bxl-product-hunt' ></i> <Link to="/products"> Productos </Link></li>
            {/* <li className="aside__list-item"><i className='bx bxl-product-hunt' ></i> <Link to="/products"> Productos de Baja </Link></li> */}
            <li className="aside__list-item"><i className='bx bxs-user-pin' ></i> <Link to="/clients"> Clientes </Link></li>
          <li className="aside__list-item">
            <details>
              <summary className="button">
                <i className="bx bxs-pie-chart-alt-2"></i> Ventas
                <i className="bx bx-down-arrow-alt"></i>
              </summary>
              <ul>
                <li className="list__details-item"><Link to="sells"> Administrar ventas</Link></li>
                <li className="list__details-item"><Link to="/sell"> Crear venta </Link></li>
              </ul>
            </details>
          </li>
          <span className="line"></span>
            <li className="aside__list-item"><i className='bx bxs-detail' ></i> Nomina</li>
            <li className="aside__list-item"><i className='bx bxs-file-export' ></i><Link to="/expenses"> Gastos </Link></li>
            <li className="aside__list-item"><i className="bx bxs-pie-chart-alt-2"></i> <Link to="/reports"> Reportes </Link></li>
        </ul>
      </aside>
    </div>
  );
}
