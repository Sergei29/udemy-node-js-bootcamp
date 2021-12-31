const fs = require("fs");

const strProductsData = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8"
);
const arrProductsData = JSON.parse(strProductsData);

const strTemplateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const strTemplateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const strTemplateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const parseTemplate = (strTemplate, objProduct) => {
  const {
    id,
    image,
    productName,
    from,
    nutrients,
    quantity,
    price,
    organic,
    description,
  } = objProduct;

  const strOrganic = true === organic ? "organic" : "not-organic";

  return strTemplate
    .replaceAll("{%IMAGE%}", image)
    .replaceAll("{%PRODUCT_NAME%}", productName)
    .replaceAll("{%NOT_ORGANIC%}", strOrganic)
    .replaceAll("{%QUANTITY%}", quantity)
    .replaceAll("{%PRICE%}", price)
    .replaceAll("{%FROM%}", from)
    .replaceAll("{%NUTRIENTS%}", nutrients)
    .replaceAll("{%DESCRIPTION%}", description)
    .replaceAll("{%ID%}", id);
};

const parseTemplateOverview = () => {
  const cardsList = arrProductsData
    .map((objCurrentProduct) =>
      parseTemplate(strTemplateCard, objCurrentProduct)
    )
    .join("");

  return strTemplateOverview.replace("{%PRODUCT_CARDS%}", cardsList);
};

module.exports = {
  arrProductsData,
  parseTemplate,
  parseTemplateOverview,
  strProductsData,
  strTemplateCard,
  strTemplateOverview,
  strTemplateProduct,
};
