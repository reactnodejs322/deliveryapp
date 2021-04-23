import React from "react";
import { Orders } from "./orders.component";
import { shallow } from "enzyme";

describe("Orders component render", () => {
  let wrapper;
  let mockPresistOrderColumn;
  let mockPresistAllColumn;

  beforeEach(() => {
    mockPresistOrderColumn = jest.fn();
    mockPresistAllColumn = jest.fn();
    const mockProps = {
      PresistOrderColumn: mockPresistOrderColumn,
      PresistAllColumn: mockPresistAllColumn,
      currentdragdrop: {
        columnOrder: ["column-1"],
        columns: {
          "column-1": { id: "column-1", orderIds: [], title: "Orders" },
        },
        orders: {},
        storename: "Royal Palm",
      },
    };

    wrapper = shallow(<Orders {...mockProps} />);
  });

  it("should render Orders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
