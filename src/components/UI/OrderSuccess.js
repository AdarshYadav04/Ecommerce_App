import orderSuccessImage from "../../assets/Icons/order_success.svg" 
import Modal from "./Modal";

const orderSuccessModal=({onClose,orderId})=>{

    return (
        <Modal onClose={onClose}>
            <div className="order-container">
                <div className="order-container--success">

                    <img src={orderSuccessImage} alt="Success" className="img-fluid"/>
                    <div className="message">
                        <h1>Order Successfully Placed!</h1>
                        <span>OrderID #{orderId}</span>
                    </div>
                </div>   
            </div>
        </Modal>
    )

}

export default orderSuccessModal