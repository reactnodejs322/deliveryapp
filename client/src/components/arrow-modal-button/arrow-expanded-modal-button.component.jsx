import React from "react";
import Modal from "@material-ui/core/Modal";
//styling
import { compressOrderDragDropSideBar } from "../../redux/orders/orders.action";
import { Fade, useStyles } from "./arrow-expanded-modal-button.styles";
import "./arrow-modal-expanded-button.styles.scss";
import { connect } from "react-redux";
import { discardOrderChanges } from "../../redux/orders/orders.action";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

/*
The reason why this modal is Odd
is because animation were not working within mapsidebar conditionalloading

further explanation:

if you were to replace <img className='expanded-arrow'/> with <ArrowModalButton/> in mapsidebar-component
the animation where it smoothly goes to the left and right would not work

Solution:

so the work arounds were to just pass function to the child component  and call the parent
component function to work around the werid  css animation bug.
without effecting the <img className='expanded-arrow'/>
*/
export const useCustomMarginButton = makeStyles({
  root: {
    margin: "10px",
  },
  label: {},
});
export const ArrowModalButton = ({
  //modal logic
  show_arrow_modal,
  handleClose,
  discardOrderChanges,
  compressOrderDragDropSideBar,
}) => {
  const classes = useStyles();
  const discardorderChanges = () => {
    discardOrderChanges();
    compressOrderDragDropSideBar();
    handleClose();
  };

  const classesButton = useCustomMarginButton();

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={show_arrow_modal}
        onClose={handleClose}
      >
        <Fade in={show_arrow_modal}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">
              Do you want to discard
              <span style={{ color: "red" }}> all </span>
              your changes ?
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={discardorderChanges}
                classes={{
                  root: classesButton.root,
                  label: classesButton.label,
                }}
              >
                Confirm
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClose}
                classes={{
                  root: classesButton.root,
                  label: classesButton.label,
                }}
              >
                cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  discardOrderChanges: () => dispatch(discardOrderChanges()),
  compressOrderDragDropSideBar: () => dispatch(compressOrderDragDropSideBar()),
});

export default connect(null, mapDispatchToProps)(ArrowModalButton);
