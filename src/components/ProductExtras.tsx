import relatedData from "@/data/related.json";
import sizeChartData from "@/data/size-chart.json";
import type { RelatedProduct, SizeChart as SizeChartData } from "@/types/product";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import Reveal from "./Reveal";
import SizeChart from "./SizeChart";

const related = relatedData as RelatedProduct[];
const sizeChart = sizeChartData as SizeChartData;

export default function ProductExtras() {
  return (
    <Reveal>
      <div className="product-extras">
        <div className="product-extras__related">
          <RelatedProducts products={related} />
        </div>
        <div className="product-extras__details">
          <ProductDetails />
          <div className="product-extras__size-chart">
            <SizeChart chart={sizeChart} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
