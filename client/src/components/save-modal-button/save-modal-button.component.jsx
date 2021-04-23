import { saveOrders, sendOrderBundle } from "../../redux/orders/orders.action";
import { connect } from "react-redux";
import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import {
  useStyles,
  Fade,
  RowContainer,
  DriverColumnContainer,
  CenterColumnContainer,
  OrderColumnContainer,
  OrderNumbersContainer,
} from "./save-modal-button.styles";
import { AnimatedPointer } from "../animated-pointers/animated-pointer.component";
export const SaveModalButton = ({
  saveOrders,
  drivers_with_orders,
  sendOrderBundle,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    saveOrders();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        style={{ margin: "10px" }}
        variant="outlined"
        color="inherit"
        onClick={handleOpen}
      >
        Send Orders to Drivers
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <RowContainer>
              <DriverColumnContainer>Drivers</DriverColumnContainer>
              <CenterColumnContainer>
                <Button
                  style={{ height: "20px" }}
                  variant="outlined"
                  color="inherit"
                  onClick={() => sendOrderBundle(drivers_with_orders)}
                >
                  Send
                </Button>
              </CenterColumnContainer>

              <OrderColumnContainer> Orders</OrderColumnContainer>
            </RowContainer>
            {/*
            borderBottom: "5px solid red;
             border-bottom-width:thin;
                */}
            {drivers_with_orders.map((driver, i) => (
              <div key={i}>
                {driver.orders.length > 0 ? (
                  <RowContainer
                    style={{
                      paddingBottom: "30px",
                    }}
                  >
                    <DriverColumnContainer>
                      {driver.firstName}{" "}
                    </DriverColumnContainer>
                    <CenterColumnContainer>
                      <AnimatedPointer />
                    </CenterColumnContainer>

                    <OrderColumnContainer
                      style={{
                        flexFlow: "row wrap",
                      }}
                    >
                      {driver.orders.map((order, i) => (
                        <OrderNumbersContainer key={i}>
                          {order.orderNumber},
                        </OrderNumbersContainer>
                      ))}
                    </OrderColumnContainer>
                  </RowContainer>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  drivers_with_orders: state.orders.drivers_with_orders,
});

const mapDispatchToProps = (dispatch) => ({
  saveOrders: () => dispatch(saveOrders()),
  sendOrderBundle: (Order_bundle) => dispatch(sendOrderBundle(Order_bundle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveModalButton);
