import React from "react";
import { NavBar } from "./navbar.component";
import { createShallow } from "@material-ui/core/test-utils";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
}));
//https://dev.to/sama/testing-material-ui-form-components-1cnh
describe("NavBar component", () => {
  let wrapper;
  let mockMatch;
  let mockHistory;
  let shallow;
  beforeEach(() => {
    mockMatch = {
      path: "/missioncontrol",
    };
    mockHistory = {
      push: jest.fn(),
    };

    const mockProp = {
      match: mockMatch,
      history: mockHistory,
    };
    shallow = createShallow();
    const mockHandleChange = jest.fn(2);
    wrapper = shallow(<NavBar handleChange={mockHandleChange} {...mockProp} />);
  });

  it("Renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("Tab clicked", () => {
    // to find a dom element to test with you must add a classname to it
    // then add .tab like here
    // you can also add <Tab data-test="dateTab1"/>
    wrapper.find('[data-test="dateTab1"]').simulate("click");
    wrapper.find('[data-test="dateTab2"]').simulate("click");

    expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.path}`);
  });

  it("handleChange on Change ", () => {
    wrapper.find('[data-test="dateTabs"]').simulate("change");
  });
});
