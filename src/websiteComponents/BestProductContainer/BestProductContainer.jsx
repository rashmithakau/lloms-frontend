import ProductCard from "./ProductCard";

const BestProductContainer = () => {
  return (
    <div>
      <div className="flex justify-center mt-10">
      <p className="text-orange-500 font-semibold text-lg font-[Pacifico]">
          Best Products
      </p>
      </div>

      <div className="flex justify-center">
        <h2 className="font-bold text-3xl">Best Products This Week!</h2>
      </div>

    <div className="flex justify-center px-5 mt-5">
      <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
export default BestProductContainer;
