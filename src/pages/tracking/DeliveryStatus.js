import React, { useState, useEffect } from "react";
import { OrderIndex, OrderStatus } from "../../constants/order.constants";
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr";
import './DeliveryStatus.css' 
export const DeliveryStatus = (props) => {
  const [state, setState] = useState({
    status: null,
  });
  
    useEffect(() => {
      setState({
      ...state,
      status: props.status,
    });
    }, [props.status]);

    useEffect(() => {
        startCons();
    });
    
    const isActive = (stepNumber) => {
        if (!state.status) {
            return 0;
        }
        return getOrderStatusNumber() >= stepNumber;
    };

    const getOrderStatusNumber = () => {
        return OrderIndex.indexOf(state.status);
    };

    const startCons = async () => {
        const orderId = window.location.href.split('/')[4];
        const url = `https://localhost:5001/hubs/order?order=${orderId}`;
        console.log(url);
        const connection = new HubConnectionBuilder()
      .withUrl(url, {
        withCredentials: false,
      })
      .configureLogging(LogLevel.Information)
      .build();

    try {
      await connection.start();
    } catch (e) {
      console.log(e);
    }

    connection.on("ChangeOrderStatus", (response) => {
        console.log(response);
        if (response && response?.orderId === orderId) {
             setState({
      ...state,
      status: response.newStatus,
    });
        }
    });
    
    };
    
  return (
      <>
<div className="modal fade" id="myModal" style={{width: '50%'}}>
   <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
         <div className="modal-body">
            <div className="progress-track">
                              <ul id="progressbar">
                                  {state.status === OrderStatus.Cancelled ? OrderStatus.Cancelled :
                                      <>
                    <li className={`step0 ${isActive(1) && 'active'}`} id="step1">Confirmed</li>
                    <li className={`step0 ${isActive(2) && 'active'}`} id="step2">Send To Kitchen</li>
                    <li className={`step0 ${isActive(3) && 'active'}`} id="step3">Ready for Pickup</li>
                    <li className={`step0 ${isActive(4) && 'active'}`} id="step4">Delivered</li>
                    </>}
                    
               </ul>
            </div>
         </div>
      </div>
   </div>
</div>
    </>
  );
};
