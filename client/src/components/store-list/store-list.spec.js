import React from "react";
import { StoreList } from "./store-list.component";
import { shallow } from "enzyme";

describe("StoreList component render", () => {
  let wrapper;

  let mocktriggerStores;

  beforeEach(() => {
    mocktriggerStores = jest.fn();

    const mockProps = {
      stores: [
        {
          location: { lat: 26.260501899508107, lng: -80.26398159301463 },

          manager: false,
          name: "Royal Palm",
          storeId: "psq1",
          __v: 0,
          _id: "60410e74be5b952498d3a376",
        },
      ],
      triggerStores: mocktriggerStores,
    };
    wrapper = shallow(<StoreList {...mockProps} />);
  });

  it("should render StoreList component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
