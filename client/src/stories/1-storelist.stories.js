import React from "react";
import { Provider } from "react-redux";
//https://storybook.js.org/docs/react/writing-docs/doc-blocks
import { StoreItem } from "../components/store-item/store-item.component";

import { action } from "@storybook/addon-actions";

// A super-simple mock of a redux store
const store = {
  getState: () => {
    return {
      store: {},
    };
  },
  subscribe: () => 0,
  setConnect: action("CONNECTED_STORE"),
  showDriver: action("SHOW_DRIVER_PANEL"),
};

export default {
  component: StoreItem,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  title: "StoreItem",
};

const Template = (args) => (
  <StoreItem
    storeInfo={{
      location: { lat: 26.260501899508107, lng: -80.26398159301463 },
      manager: false,
      name: "Royal Palm",
      storeId: "psq1",
      __v: 0,
      _id: "60410e74be5b952498d3a376",
    }}
    setConnectedStore={store.setConnect}
    showDriverPanel={store.showDriver}
    {...args}
  />
);

export const Default = Template.bind({});
