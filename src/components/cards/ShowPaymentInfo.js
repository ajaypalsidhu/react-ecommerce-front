import React from 'react';


const ShowPaymentInfo = ({ order }) => {
    return (
        <div className="">
            <p>
                <span><b>Order Id</b> : {order.paymentIntent.id}</span>{' | '}
                <span><b>Amount</b> : {(order.paymentIntent.amount/=100).toLocaleString('en-us', {
                    style:'currency', currency:'USD'
                })}</span>{'  '}
                <span><b>Currency</b>: {order.paymentIntent.currency.toUpperCase()}</span>{' | '}
                <span><b>Method</b> : {order.paymentIntent.payment_method_types[0]}</span>{' | '}<br />
                <span><b>Payment</b> : {order.paymentIntent.status.toUpperCase()}</span>{' | '}
                <span>
                    <b>Date</b> : {new Date(order.paymentIntent.created * 1000).toLocaleString()}
                </span>{' | '}
                <span className="badge bg-primary text-white">
                    <b>Status</b> : {order.orderStatus}
                </span>
            </p>
        </div>
    );
}

export default ShowPaymentInfo;