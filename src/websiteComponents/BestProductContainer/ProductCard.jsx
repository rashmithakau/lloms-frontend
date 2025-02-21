import image from "../../assets/foodimages/caramalDonut.png";

const ProductCard = () => {
  return (
    <div className="w-[250px] h-[250px] rounded-[10px] overflow-hidden shadow-lg">
      <img src={image} alt="Procut Image" className="w-full h-[200px] object-cover" />
      <div className="bg-[#F4952C] text-white text-center py-3 text-lg font-semibold">
        Caramel Donut
      </div>
    </div>
  );
};

export default ProductCard;