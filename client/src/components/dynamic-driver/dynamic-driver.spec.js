import React from "react";
import { DynamicDriver } from "./dynamic-driver.componet";
import { shallow } from "enzyme";

describe("DynamicDriver component render", () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      userinfo: {
        firstName: "felipe",
        lastName: "rodas",
        employeeId: 3533,
        isActive: false,
      },
    };
    wrapper = shallow(<DynamicDriver {...mockProps} />);
  });

  it("should render DynamicDriver component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
