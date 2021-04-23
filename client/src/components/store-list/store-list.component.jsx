import React, { useEffect } from "react";
import StoreItem from "../store-item/store-item.component";
import { connect } from "react-redux";
import { fetchApiStoreListUseEffect } from "../../redux/stores/stores.action";
import "./store-list.styles.scss";
export const StoreList = ({ stores, fetchApiStoreListUseEffect }) => {
  useEffect(() => {
    fetchApiStoreListUseEffect();
  }, [fetchApiStoreListUseEffect]);
  return (
    <div className="store-list">
      {stores.map((storeinfo, index) => (
        <StoreItem key={storeinfo._id} storeInfo={storeinfo} />
      ))}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  stores: state.stores.stores,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchApiStoreListUseEffect: () => dispatch(fetchApiStoreListUseEffect()),
});
export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
