import React from "react";
import { MapSideBar } from "./map-sidebar.component";
import { shallow } from "enzyme";

describe("Orders component render", () => {
  let wrapper;
  let mockSocketOff;
  let mockclearActiveDriver;
  let mockordersSocketOn;
  let mockordersSocketOff;

  beforeEach(() => {
    mockSocketOff = jest.fn();
    mockclearActiveDriver = jest.fn();
    mockordersSocketOn = jest.fn();
    mockordersSocketOff = jest.fn();
    const mockProps = {
      socketOff: mockSocketOff,
      clearActiveDriver: mockclearActiveDriver,
      ordersSocketOn: mockordersSocketOn,
      ordersSocketOff: mockordersSocketOff,
      socket: false,
      showorders: false,
    };

    wrapper = shallow(<MapSideBar {...mockProps} />);
  });

  it("should render MapSideBar component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
