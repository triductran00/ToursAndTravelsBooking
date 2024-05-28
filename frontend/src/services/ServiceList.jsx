import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
    {
        imgUrl: weatherImg,
        title: 'Calculate Weather',
        desc: 'Get accurate weather forecasts for your destinations to plan your trips perfectly.'
    },
    {
        imgUrl: guideImg,
        title: 'Best Tour Guide',
        desc: 'Enjoy tours with top-rated local guides who know all the hidden gems.'
    },
    {
        imgUrl: customizationImg,
        title: 'Customization',
        desc: 'Create your perfect travel itinerary with customizable options to suit your needs.'
    }
]
const ServiceList = () => {
    return (
        <>
            {servicesData.map((item, index) => (
                <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
                    <ServiceCard item={item} />
                </Col>
            ))}
        </>
    );
}

export default ServiceList