"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageItem {
    url: string;
    caption?: string;
    title?: string;
    description?: string;
}

interface CarouselProps {
    images: ImageItem[]; // Array of images
    autoplay?: boolean; // Enable or disable autoplay
    navigation?: boolean; // Enable or disable navigation
    pagination?: boolean; // Enable or disable pagination
    loop?: boolean; // Enable or disable infinite looping
    slidesPerView?: number; // Number of slides visible at a time
    spaceBetween?: number; // Space between slides
    breakpoints?: {
        [width: number]: {
            slidesPerView?: number;
            spaceBetween?: number;
        };
    };
}

const Carousel: React.FC<CarouselProps> = ({
    images,
    autoplay = false,
    navigation = false,
    pagination = false,
    loop = false,
    slidesPerView = 1,
    spaceBetween = 10,
    breakpoints = {},
}) => {

    return (
        <>
            <div className="relative">
                {/* Custom Navigation Buttons */}
                {navigation && (
                    <>
                        <button className="swiper-button-prev-custom sm:block hidden z-10 absolute top-1/2 cursor-pointer left-2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full shadow-lg">
                            <FaChevronLeft className='w-6 h-6' />
                        </button>
                        <button className="swiper-button-next-custom sm:block hidden z-10 absolute top-1/2 cursor-pointer right-2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full shadow-lg">
                            <FaChevronRight className='w-6 h-6' />
                        </button>
                    </>
                )}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={autoplay ? { delay: 3000, disableOnInteraction: true } : false}
                    navigation={navigation ? { nextEl: ".swiper-button-next-custom", prevEl: ".swiper-button-prev-custom" } : false}
                    pagination={pagination}
                    loop={loop}
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                    breakpoints={breakpoints}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative">
                                <img
                                    src={image.url}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[150px] sm:h-[250px] md:h-[390px] lg:h-[420px] xl:h-[490px] object-cover rounded-3xl"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute bottom-0 left-0 w-full h-full rounded-b-3xl bg-gradient-to-t from-black/90 via-black/50 to-black/10 z-10" />

                                {/* Text Content */}
                                {(image.title || image.description) && (
                                    <div className="absolute bottom-0 left-0 w-full z-20 p-4 md:p-10 text-white">
                                        {image.title && <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-tr from-[#8C00FF] to-white text-transparent bg-clip-text line-clamp-2">{image.title}</h2>}
                                        {image.description && <p className="text-sm line-clamp-3 max-[768]:hidden">{image.description}</p>}
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Carousel;