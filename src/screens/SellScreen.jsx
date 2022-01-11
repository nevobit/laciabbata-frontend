import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listClients } from "../actions/clientActions";
import { listProducts } from "../actions/productActions";
import { addItem, clear, createSell, listSells, removeItem } from "../actions/sellActions";
import DivisaFormater from "../components/DivisaFormater";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ReactToPrint from 'react-to-print';
import { SELL_CREATE_RESET } from "../constants/sellConstants";

export default function SellScreen() {
  const [typeClient, setClientType] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [search, setSearch] = useState("");
  const [nameClient, setNameClient] = useState("Cliente General");
  
  
  // Cart
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  // Products List
  const productsList = useSelector((state) => state.productsList);
  const { loading: loadingList, error: errorList, products } = productsList;

  //   Clients List
  const clientsList = useSelector((state) => state.clientsList);
  const { loading: loadingClients, clients } = clientsList;

  const sellsList = useSelector((state) => state.sellsList);
  const { loading:loadingSells,  sells } = sellsList;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSells());
    dispatch(listProducts());
    dispatch(listClients());
  }, [dispatch]);

  const date = new Date();

  let today =(date.getDate() < 10? "0" + date.getDate() : date.getDate()) +
  "/" +
  "0" +
  (date.getMonth() + 1) +
  "/" +
  date.getFullYear();

  const addHandler = (id) => {
    if (id) {
      dispatch(addItem(id, 1));
    }
  };

  const clientHandler = (e) => {
    const index = e.target.selectedIndex;
    setClientType(e.target.value);
    setNameClient(e.target.options[index].text); 
  }

  const removeHandler = (id) => {
    dispatch(removeItem(id));
  };

  const componentRef = useRef();

  let code = 10000;

  if(!loadingSells){
    if(sells.length > 0){
      code = sells[sells.length - 1].code + 1;
    }
  }

  cart.code = code;
  cart.paymentMethod = paymentMethod;
  cart.cliente = nameClient;
  cart.itemsPrice = items.reduce((a, c) => a + (typeClient === 0? c.priceDetal : c.priceMajor) * c.qty, 0);

  const sellHandler = () =>{
    dispatch(createSell({...cart}));
    dispatch(clear());
    dispatch({type: SELL_CREATE_RESET});
    window.location.reload(true);
  }

  console.log(typeClient);
  return (
    <div className="row">
        
        <div className="card info">

        <div className=" invoice" ref={componentRef}>
        <h2>LA CIABBATA</h2>
        <p className="mb-10">Panaderia & Pasteleria</p>
        <p>
          <strong>NIT:</strong> 35603371
        </p>
        <p>
          <strong>Direccion:</strong> Carrera 80a #35-16
        </p>
        <div className="line"></div>
        <p>
          <strong> Telefono:</strong> 3147292198
        </p>
        <p>
          {" "}
          <strong> Factura de venta:</strong> {code}
        </p>
        <p>
          {" "}
          <strong> fecha de venta:</strong> {today}
        </p>
        <p> <strong> Cliente: </strong> {nameClient}</p>
        <p><strong> Metodo de pago:</strong> {paymentMethod}</p>
        <div className="line"></div>
        <br />
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Vlr.Uni</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
             {items.map((item) => (
               <tr>
                     <td>{item.name}</td>
                     <td>{item.qty}</td>
                     <td> <DivisaFormater value = {typeClient === 0? Number(item.priceDetal) : Number(item.priceMajor)}></DivisaFormater></td>
                     <td> <DivisaFormater value = {typeClient === 0? Number(item.priceDetal * item.qty) : Number(item.priceMajor * item.qty)}></DivisaFormater></td>
                 </tr>
             ))}
          </tbody>
        </table>
        <div className="line"></div>
        <div className="total"><span className="mr-10"> Total:</span> <DivisaFormater
                value={items.reduce((a, c) => a + (typeClient === 0? c.priceDetal : c.priceMajor) * c.qty, 0)}
                ></DivisaFormater></div>
        <div className="line"></div>

        <p>Gracias por su compra</p>
      </div>
                </div>


      
      <div className="card info" >
        <div className="card__header">
          <h2 className="card__title">Crear Venta</h2>
          <h4>
            {today}
          </h4>
        </div>
        <div className="card__body">
          <div className="form-group">
            <p>NIT: 35603371</p>
          </div>

          <div className="form-group">
            <p>Factura: {code}</p>
          </div>
          <div className="form-group">
            <select onChange={(e) => clientHandler(e)}>
              
              <option value={1}> General</option>
              {loadingClients ? (
                <LoadingBox></LoadingBox>
              ) : errorList ? (
                <MessageBox variant="danger">{errorList}</MessageBox>
              ) : (
                <>
                  {clients.map((client) => (
                    <>
                    <option key={client._id} value={client.type}>
                      {client.name}
                    </option>
                    </>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="">
            {items.length === 0 ? (
              <h4 className="">No hay Productos</h4>
            ) : (
              <div className="w-100">
                {items.map((item) => (
                  <div className="w-100">
                    <ul key={item.product} className="list_add_product">
                      <li>{item.name}</li>
                      <li>
                        <select
                          name=""
                          id=""
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addItem(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </li>
                      <li>
                        <DivisaFormater value={typeClient === 0? Number(item.priceDetal) : Number(item.priceMajor)}></DivisaFormater>
                      </li>
                      <li>
                        <button
                          className=""
                          onClick={() => removeHandler(item.product)}
                        >
                          <i className="bx bxs-trash-alt btn-icon"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <select name="" id="" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <div className="form-group">
            <div className="input">
              <div>Total:</div>
              <DivisaFormater
                value={items.reduce((a, c) => a + (typeClient === 0? c.priceDetal : c.priceMajor) * c.qty, 0)}
              ></DivisaFormater>
            </div>
            
          </div>
          <div className="flex">

          
        <button className="btn-success btn" onClick={sellHandler}>Guardar</button>

        {/* <ReactToPdf targetRef={ref} filename={"Cotizacion.pdf"} x={25}>
        {({ toPdf }) => <button className="btn-success btn" onClick={toPdf}>Guardar</button>}
    </ReactToPdf> */}
    <ReactToPrint
        trigger={() => <button className="btn btn-success" onClick={sellHandler}>Imprimir!</button>}
        content={() => componentRef.current}
        />
        </div>
        </div>
      </div>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Productos</h2>
         <div className="form-group m-0">
             <input type="search" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)}/>
         </div>
        </div>
        <div className="card__body">
          <table>
            <thead>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </thead>
            {loadingList ? (
              <LoadingBox></LoadingBox>
            ) : errorList ? (
              <MessageBox variant="danger">{errorList}</MessageBox>
            ) : (
              <>
                <tbody>
                  {products.filter((product) => (search === '' || product.code === search))
                  .map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>
                        <DivisaFormater
                          value={typeClient === 0?  Number(product.priceDetal) : Number(product.priceMajor) }
                        ></DivisaFormater>
                      </td>
                      <td>
                        <button onClick={() => addHandler(product._id)}>
                          <i className="bx bx-plus-medical btn-icon"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
