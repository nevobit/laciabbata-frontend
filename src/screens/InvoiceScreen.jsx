import React from 'react'
import ReactToPdf from "react-to-pdf";

export default function InvoiceScreen() {
    const ref = React.createRef();
    return (
        <>
        <div className="card info">

        <ReactToPdf targetRef={ref} filename={"Cotizacion " + ".pdf"} x={25}>
        {({ toPdf }) => <button className="btn-none" onClick={toPdf}>Generate pdf</button>}
    </ReactToPdf>
        </div>
        <div className="card info invoice" ref={ref}>
            <h2 >LA CIABATA</h2>
            <p className="mb-10">Panaderia & Pasteleria</p>
            <p><strong>NIT:</strong> 35603371</p>
            <p><strong>Direccion:</strong> Carrera 80a #35-16</p>
            <div className="line"></div>
            <p><strong> Telefono:</strong> 3147292198</p>
            <p> <strong> Factura de venta:</strong>  0002</p>
            <p> <strong> fecha de venta:</strong>  2021-10-05</p>
            <p>Cliente General</p>
            <div className="line"></div>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cant.</th>
                        <th>Vlr.Uni</th>
                        <th>Total</th>
                    </tr>
                </thead>
            </table>
            <div className="line"></div>
            <div className="total">Total: $34,000 </div>
            <div className="line"></div>

            <p>Gracias por su compra</p>
        </div>
        </>
    )
}
