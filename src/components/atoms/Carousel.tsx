"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Navigation, Pagination, Autoplay, Thumbs, EffectCards } from 'swiper/modules';
import { useState } from 'react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

interface ImageItem {
    url: string; // Image URL
    caption?: string; // Optional caption for captions variant
}

interface CarouselProps {
    images: ImageItem[]; // Array of images
    autoplay?: boolean; // Enable or disable autoplay
    navigation?: boolean; // Enable or disable navigation
    pagination?: boolean; // Enable or disable pagination
    loop?: boolean; // Enable or disable infinite looping
    slidesPerView?: number; // Number of slides visible at a time
    spaceBetween?: number; // Space between slides
    variant?: 'simple' | 'caption' | 'thumbnail' | 'EffectCards';
}

const Carousel: React.FC<CarouselProps> = ({
    images,
    autoplay = false,
    navigation = false,
    pagination = false,
    loop = false,
    slidesPerView = 1,
    spaceBetween = 10,
    variant = 'simple',
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <>
            {/* Different implementations for each variant */}
            {variant === 'simple' && (
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
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image.url}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[150px] sm:h-[250px] md:h-[390px] lg:h-[420px] xl:h-[490px] object-cover rounded-3xl"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {variant === 'caption' && (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
                    navigation={navigation}
                    pagination={pagination}
                    loop={loop}
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={image.url}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: 1,
                                    }}
                                ></div>
                                {image.caption && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '100%',
                                            color: '#fff',
                                            padding: '60px',
                                            fontSize: '14px',
                                            zIndex: 2,
                                        }}
                                    >
                                        <div className='text-lg xl:text-xl font-bold'>
                                            {image.caption}
                                        </div>
                                        <div className='text-[8px] sm:text-xs xl:text-sm mb-2 text-justify'>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {variant === 'thumbnail' && (
                <>
                    <Swiper
                        modules={[Navigation, Pagination, Thumbs, Autoplay]}
                        thumbs={{ swiper: thumbsSwiper }}
                        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
                        navigation={navigation}
                        pagination={{
                            type: 'fraction',
                        }}
                        loop={loop}
                        slidesPerView={slidesPerView}
                        spaceBetween={spaceBetween}
                        className='mb-2'
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image.url}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        modules={[Navigation, Pagination, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        slidesPerView={4}
                        spaceBetween={8}
                        watchSlidesProgress
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-auto object-cover cursor-pointer"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}

            {variant === 'EffectCards' && (
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image.url}
                                alt={`Slide ${index + 1}`}

                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
};

export default Carousel;