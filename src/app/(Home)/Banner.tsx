"use client";

import { useGetData } from "@/actions";
import { Carousel } from "@/components";
import { API_URL_seasonNow } from "@/constants";

const Banner = () => {
    const getBanner = useGetData(API_URL_seasonNow, ["banner"], true);

    const images = getBanner.data?.data?.map((item: any) => ({
        url: item.trailer?.images?.maximum_image_url,
        title: item.title,
        description: item.synopsis
    })) || [];

    return (
        <div className="bg-[#1A1A1A] text-white pt-[94px] pb-4 sm:pt-[130px] px-4 sm:px-[60px] sm:pb-8">
            <Carousel
                images={images}
                navigation={false}
                autoplay={true}
                loop={true}
                pagination={false}
            />
        </div>
    );
};

export default Banner;
