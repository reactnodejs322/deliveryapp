import React from "react";
import { DiscordCircle } from "./discord-circle.component";
import { shallow } from "enzyme";

describe("DiscordCircle component render", () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      lightSwitch: true,
    };
    wrapper = shallow(<DiscordCircle {...mockProps} />);
  });

  it("should render DiscordCircle component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
