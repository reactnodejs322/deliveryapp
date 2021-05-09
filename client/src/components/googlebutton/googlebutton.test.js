import React from "react";
import { GoogleButton } from "./googlebutton.component";
import { shallow } from "enzyme";

describe("GoogleButton should be rendered", () => {
  let wrapper;
  beforeEach(() => {
    const mockProps = { test: "string test" };
    wrapper = shallow(<GoogleButton {...mockProps} />);
  });

  it("Should snapshot GoogleButton", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
//        I am Alex
