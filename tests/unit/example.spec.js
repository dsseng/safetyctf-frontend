/*
import { shallowMount } from "@vue/test-utils";
import Logo from "@/components/Logo.vue";
*/

const { shallowMount } = require("@vue/test-utils");
const Logo = require("@/components/Logo");

describe("Logo.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Logo, {
      propsData: {}
    });
    expect(wrapper.$el).toMatchSnapshot();
  });

  it("renders correctly if is vertical", () => {
    const wrapper = shallowMount(Logo, {
      propsData: {
        isVertical: true
      }
    });
    expect(wrapper.$el).toMatchSnapshot();
  });

  it("renders correctly with custom width and height", () => {
    const wrapper = shallowMount(Logo, {
      propsData: {
        width: 900,
        height: 230
      }
    });
    expect(wrapper.$el).toMatchSnapshot();
  });
});
