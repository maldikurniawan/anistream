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
            {getBanner.isLoading && (
                <div className="animate-pulse bg-[#333333] w-full h-[150px] sm:h-[250px] md:h-[390px] lg:h-[420px] xl:h-[490px] rounded-3xl"></div>
            )}
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
