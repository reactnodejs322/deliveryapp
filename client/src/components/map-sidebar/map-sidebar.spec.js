import React from "react";
import { MapSideBar } from "./map-sidebar.component";
import { shallow } from "enzyme";

describe("Orders component render", () => {
  let wrapper;
  let mockSocketOff;
  let mockclearActiveDriver;
  let mockexpandOrderDragDropSideBar;
  let mockcompressOrderDragDropSideBar;

  beforeEach(() => {
    mockSocketOff = jest.fn();
    mockclearActiveDriver = jest.fn();
    mockexpandOrderDragDropSideBar = jest.fn();
    mockcompressOrderDragDropSideBar = jest.fn();
    const mockProps = {
      socketOff: mockSocketOff,
      clearActiveDriver: mockclearActiveDriver,
      expandOrderDragDropSideBar: mockexpandOrderDragDropSideBar,
      compressOrderDragDropSideBar: mockcompressOrderDragDropSideBar,
      socket: false,
      showorders: false,
    };

    wrapper = shallow(<MapSideBar {...mockProps} />);
  });

  it("should render MapSideBar component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
