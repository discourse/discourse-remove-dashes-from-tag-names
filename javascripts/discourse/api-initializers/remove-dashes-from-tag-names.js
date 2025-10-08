import { typeOf } from "@ember/utils";
import $ from "jquery";
import { apiInitializer } from "discourse/lib/api";
import { defaultRenderTag } from "discourse/lib/render-tag";
import BaseTagSectionLink from "discourse/lib/sidebar/user/tags-section/base-tag-section-link";

export default apiInitializer((api) => {
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
      return this.name.replace(/-/g, " ");
    },
  });
});
