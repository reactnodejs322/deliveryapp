import React, { useEffect } from "react";
import StoreItem from "../store-item/store-item.component";
import { connect } from "react-redux";
import { triggerStores } from "../../redux/stores/stores.action";
import "./store-list.styles.scss";
const StoreList = ({ stores, triggerStores }) => {
  console.log(stores);

  useEffect(() => {
    triggerStores();
  }, [triggerStores]);

  return (
    <div className="store-list">
      {stores.map((storeinfo, index) => (
        <StoreItem key={storeinfo._id} storeInfo={storeinfo} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stores: state.stores.stores,
});

const mapDispatchToProps = (dispatch) => ({
  triggerStores: () => dispatch(triggerStores()),
});
export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
