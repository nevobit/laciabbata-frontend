import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_RESET } from "../constants/userConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  createClient,
  deleteClient,
  listClients,
} from "../actions/clientActions";
import { CLIENT_CREATE_RESET } from "../constants/clientConstants";
import swal from "sweetalert";

export default function ClientsScreen(props) {
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [type, setType] = useState(0);

  const clientCreate = useSelector((state) => state.clientCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate  } = clientCreate;

  const clientsList = useSelector((state) => state.clientsList);
  const { loading: loadingList, error: errorList, clients } = clientsList;

  const clientDelete = useSelector((state) => state.clientDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = clientDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if(successCreate){
      dispatch({type: CLIENT_CREATE_RESET})
    }
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listClients());
  }, [dispatch, props.history, successDelete, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createClient(name, phone, address, type));
  };

  const deleteHandler = (client) => {
    
    swal('Seguro que quieres borrar a ' + client.name + '?', {
      icon: 'warning',
      buttons: ['Cancelar', 'Si, Borrar!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! ' + client.name + ' Borrado!', {
          icon: 'success',
        });
        dispatch(deleteClient(client._id));
      }
    });
  };

  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Clientes</h2>
          <div className="buttons">
            <button
              className="btn btn-success mr-10 flex"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-plus"></i> Agregar Cliente
            </button>
            <button className="btn flex">
              <i className="bx bx-download"></i> Exportar
            </button>
          </div>
        </div>
        <div className="card__body">
        {!loadingList && clients.length === 0 ? (
                  <MessageBox variant="info">No Hay Clientes</MessageBox>
                ) : (
          <table className="even">
            <thead>
              <tr>
                <th>Name</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Tipo</th>
                <th>Compras</th>
                <th>Fecha</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loadingList ? (
              <LoadingBox></LoadingBox>
            ) : errorList ? (
              <MessageBox variant="danger">{errorList}</MessageBox>
            ) : (
              <>
               
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client._id}>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                        <td>{client.type === 0? 'Al Detal' : 'Al por Mayor'}</td>
                        <td>{client.buys}</td>
                        <td>{client.createdAt.substring(0, 10)}</td>
                        <td>
                          <button>
                            <i className="bx bxs-pencil btn-icon"></i>
                          </button>
                          <button>
                            <i
                              className="bx bxs-trash-alt btn-icon"
                              onClick={() => deleteHandler(client)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              
              </>
            )}
          </table>
            )}
        </div>
      </div>
      <div className={openModal ? "modal active" : "modal"}>
        <div className="modal-dialog">
          <div className="card">
            <div className="card__header b-line">
              <h2 className="card__title">Agregar Cliente</h2>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="phone"
                    placeholder="Telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="address"
                    placeholder="Direccion"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select 
                  name="" 
                  id=""
                  placeholder="Tipo Cliente"
                  value={type}
                  onChange={(e) => setType(e.target.value)}>
                    <option value={0}>Cliente Al Detal</option>
                    <option value={1}>Cliente Al Por Mayor</option>
                  </select>
                  
                </div>
              
              </form>
            </div>
            <div className="card__footer flex center">
              <button className="btn btn-success mr-10" onClick={submitHandler}>
                Guardar
              </button>
              <button className="btn" onClick={() => setOpenModal(!openModal)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
