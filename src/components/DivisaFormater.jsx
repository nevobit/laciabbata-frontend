import React from 'react'

export default function DivisaFormater(props) {
    const {value} = props;

    const formaterMoney = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return (
        <div>
            <span>${formaterMoney.format(value)}</span>
        </div>
    )
}