import React from "react";
import { StoreItem } from "./store-item.component";
import { shallow } from "enzyme";

describe("StoreItem component render", () => {
  let wrapper;
  let mockClearItem;
  let mockAddItem;
  let mockRemoveItem;
  beforeEach(() => {
    mockClearItem = jest.fn();
    mockAddItem = jest.fn();
    mockRemoveItem = jest.fn();
    const mockProps = {
      storeInfo: {
        imageUrl: "www.testImage.com",
        price: 10,
        name: "hats",
        quantity: 2,
      },
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      clearItem: mockClearItem,
    };
    wrapper = shallow(<StoreItem {...mockProps} />);
  });

  it("should render StoreItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
