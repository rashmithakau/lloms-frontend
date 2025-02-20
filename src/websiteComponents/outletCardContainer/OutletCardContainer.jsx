import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image from "../../assets/profileImages/mathara.jpg";
import { useRef } from "react";
import "./OutletCardContainer.css";
import OutletCard from '../outletCard/OutletCard';

const images = [
    "https://picsum.photos/id/1011/200/200",
    "https://picsum.photos/id/1025/200/200",
    "https://picsum.photos/id/1033/200/200",
    "https://picsum.photos/id/1045/200/200",
    "https://picsum.photos/id/1062/200/200",
    "https://picsum.photos/id/1071/200/200",
    "https://picsum.photos/id/1084/200/200",
    "https://picsum.photos/id/1097/200/200",
    "https://picsum.photos/id/1103/200/200",
    "https://picsum.photos/id/1115/200/200",
    "https://picsum.photos/id/1124/200/200",
    "https://picsum.photos/id/1132/200/200",
    "https://picsum.photos/id/1145/200/200",
    "https://picsum.photos/id/1153/200/200",
    "https://picsum.photos/id/1167/200/200",
    "https://picsum.photos/id/1174/200/200",
    "https://picsum.photos/id/1182/200/200",
    "https://picsum.photos/id/1196/200/200",
    "https://picsum.photos/id/1203/200/200",
    "https://picsum.photos/id/1215/200/200",
    "https://picsum.photos/id/1224/200/200"
  ];

  const phoneNumbers = [
    "+94 77 111 1111", "+94 77 222 2222", "+94 77 333 3333", "+94 77 444 4444", "+94 77 555 5555",
    "+94 77 666 6666", "+94 77 777 7777", "+94 77 888 8888", "+94 77 999 9999", "+94 77 123 4567",
    "+94 76 234 5678", "+94 75 345 6789", "+94 74 456 7890", "+94 73 567 8901", "+94 72 678 9012",
    "+94 71 789 0123", "+94 70 890 1234", "+94 78 901 2345", "+94 79 012 3456", "+94 77 234 5678",
    "+94 77 345 6789"
  ];

  const descriptions = [
    "Best quality products available here, ensuring customer satisfaction with every purchase.",
    "Visit us for exciting discounts on a wide range of products, available for a limited time!",
    "Your one-stop shop for daily essentials, providing everything you need for everyday living.",
    "Fresh stock available every day to meet all your needs with new arrivals that are sure to impress.",
    "Affordable prices and great service, making quality products accessible to everyone.",
    "We bring you the best deals! Discover unbeatable prices on top-quality items today.",
    "A trusted name in retail shopping, offering reliable products and services with a smile.",
    "Exclusive products just for you, handpicked to match your preferences and needs.",
    "Satisfaction guaranteed with every purchase, because we believe in delivering excellence.",
    "New arrivals every week! Keep an eye out for the latest trends and hottest items.",
    "Your favorite outlet in town, always ready to serve you with the finest collection of products.",
    "Customer happiness is our priority, and we go the extra mile to make sure you leave satisfied.",
    "Find everything you need under one roof, from everyday essentials to unique finds you’ll love.",
    "Exciting seasonal offers available, perfect for adding something special to your cart.",
    "We value your trust and loyalty, and we strive to keep earning it with each visit.",
    "Serving the community with quality products and creating a shopping experience you'll cherish.",
    "Step into our outlet and experience the best shopping environment, designed for your comfort.",
    "We bring the latest trends to you, offering a curated selection of fashion-forward items.",
    "Convenient shopping with a great variety, so you can find exactly what you're looking for.",
    "Your shopping experience, redefined with personalized service and hand-selected products.",
    "Hassle-free shopping experience with us, thanks to our helpful staff and smooth checkout process.",
    "Handpicked products to suit your needs, ensuring that every item in our store is of the highest quality."
  ];

  const outlets = Array.from({ length: 21 }, (_, i) => ({
    id: i + 1,
    name: `Outlet ${i + 1}`,
    phone: phoneNumbers[i],
    description: descriptions[i],
    image: images[i],
}));
const OutletCardContainer = () => {
    // Create a reference for the Swiper instance
    const swiperRef = useRef(null);

    // Function to handle navigation button click
    const handleNavigationClick = (direction) => {
        if (swiperRef.current) {
            // Stop autoplay on button click
            swiperRef.current.autoplay.stop();

            // Slide to the next or previous card
            if (direction === 'prev') {
                swiperRef.current.swiper.slidePrev();
            } else if (direction === 'next') {
                swiperRef.current.swiper.slideNext();
            }

            // Start autoplay again after a small delay (2 seconds)
            setTimeout(() => {
                swiperRef.current.autoplay.start();
            }, 2000); // Adjust the timeout as needed (2 seconds here)
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="w-full bg-white shadow-lg rounded-lg overflow-auto px-6 py-6 mx-7">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-[#F4952C] font-pacifico text-3xl font-bold">Outlets</h2>
                    <h3 className="text-black font-quicksand text-4xl font-semibold mt-2">
                        We Care About Our Customers <br /> Experience Too
                    </h3>
                </div>

                {/* Carousel Wrapper */}
                <div className="flex items-center justify-between">
                    {/* Left Navigation Button */}
                    <div className="flex justify-center items-center w-12 h-12">
                        <button
                            className="prev-arrow flex items-center justify-center w-full h-full bg-[#F4952C]/30 rounded-full shadow-md hover:bg-[#F4952C]/40 hover:border-2 hover:border-[#F4952C] text-[#F4952C]/60 hover:text-[#F4952C]"
                            onClick={() => handleNavigationClick('prev')}
                        >
                            <FaChevronLeft />
                        </button>
                    </div>

                    {/* Middle Div with Cards (Set of Cards in a Separate Div) */}
                    <div className="flex-1 overflow-hidden flex justify-center items-center">
                        <div className="card-set-container">
                            <Swiper
                                ref={swiperRef}  // Attach the reference here
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    640: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                    1280: { slidesPerView: 5 }
                                }}
                                spaceBetween={10}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    prevEl: '.prev-arrow',
                                    nextEl: '.next-arrow',
                                }}
                                autoplay={{
                                    delay: 1500,  // Adjust the autoplay delay (3 seconds)
                                    disableOnInteraction: false,
                                }}
                                speed={1000}  // Slower transition speed (1 second per slide)
                                modules={[Pagination, Navigation, Autoplay]}
                                className="mySwiper"
                            >
                                {outlets.map((outlet) => (
                                    <SwiperSlide key={outlet.id}>
                                        <OutletCard outlet={outlet} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Right Navigation Button */}
                    <div className="flex justify-center items-center w-12 h-12">
                        <button
                            className="next-arrow flex items-center justify-center w-full h-full bg-[#F4952C]/30 rounded-full shadow-md hover:bg-[#F4952C]/40 hover:border-2 hover:border-[#F4952C] text-[#F4952C]/60 hover:text-[#F4952C]"
                            onClick={() => handleNavigationClick('next')}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutletCardContainer;
