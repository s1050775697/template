import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import React, {useEffect, useState} from "react";
import HeartIcon from "@/components/svgs/HeartIcon";
import HeartIconFilled from "@/components/svgs/HeartIconFilled";
import { StarIcon } from '@chakra-ui/icons'
import { GET_ITEM } from '@/utils/storage'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './page.css'
import axios from "axios";

const PoiCard = ({ data, isLike = false, onLikeChange }: any) => {
    const [innerLike, setInnerLike] = useState(false);

    const onLike = async () => {
        let token = GET_ITEM("token") as string;
        if (token.startsWith('"')) {
            token = JSON.parse(token);
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favorite/create`, {
            poiInfo: data
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Ensure token is correct
            },
        });
        setInnerLike(true);
    }

    const onDislike = async () => {
        let token = GET_ITEM("token") as string;
        if (token.startsWith('"')) {
            token = JSON.parse(token);
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favorite/delete`, {
            poiId: data.id
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Ensure token is correct
            },
        });
        setInnerLike(false);
        onLikeChange()
    }

    useEffect(() => {
        setInnerLike(isLike)
    }, [isLike])

    return (
        <div className='poi-card'>
            <div className='love'>
                {innerLike ? <HeartIconFilled color='#e71962' onClick={onDislike} /> : <HeartIcon color='#e71962' onClick={onLike} />}
            </div>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {data.photos.map((v: any) => (
                    <SwiperSlide key={v.url}>
                        <img src={v.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='poi-content'>
                <div className="poi-name">
                    <div className='poi-name-label'>{data.name}</div>
                    {Boolean(data.rating) && (
                        <div className='rate'>
                            <StarIcon color="#d1f561"/>
                            <span>{data.rating}</span>
                        </div>
                    )}
                </div>
                <div className="poi-type">{data.type}</div>
                <div className="poi-pos">{data.cityname}</div>
            </div>
        </div>
    )
}

export default PoiCard;

