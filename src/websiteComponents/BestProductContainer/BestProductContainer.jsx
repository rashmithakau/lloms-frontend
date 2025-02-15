import ProductCard from "./ProductCard";

const BestProductContainer = () => {
  return (
    <div className="flex justify-center px-5 mt-10">
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default BestProductContainer;
