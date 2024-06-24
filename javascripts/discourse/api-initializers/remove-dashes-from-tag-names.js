import { typeOf } from "@ember/utils";
import $ from "jquery";
import { apiInitializer } from "discourse/lib/api";
import { defaultRenderTag } from "discourse/lib/render-tag";
import BaseTagSectionLink from "discourse/lib/sidebar/user/tags-section/base-tag-section-link";

export default apiInitializer("0.11.1", (api) => {
  const customRenderer = (tag, params) => {
    const result = defaultRenderTag(tag, params);
    const text = $(result).html();
    let modifiedText = text;
    if (text && typeOf(text) === "string") {
      modifiedText = text.replace(/-/g, " ");
    }

    let val = $(result).html(modifiedText).prop("outerHTML");

    return val;
  };

  api.replaceTagRenderer(customRenderer);

  Object.defineProperty(BaseTagSectionLink.prototype, "text", {
    get() {
      let name = this.name;
      return name.replace(/-/g, " ");
    },
  });
});
