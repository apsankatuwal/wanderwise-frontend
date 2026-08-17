import { Compass, GlobeCheck, Map, Plane } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const featuresData = [
    {
        title: "24*7 Availability",
        content: "Our website works 24*7 without any interruption. We guarentee 100% uptime.",
        icon: GlobeCheck,
        link: "/about"
    },
    {
        title: "Personalized Itineraries",
        content: "Create customized travel itineraries tailored to your destination, interests, and travel preferences.",
        icon: Map,
        link: "/features"
    },
    {
        title: "Smart Travel Planning",
        content: "Plan your trips effortlessly with smart recommendations for destinations, activities, stays, and more.",
        icon: Compass,
        link: "/contact"
    },
    {
        title: "Discover New Experiences",
        content: "Explore exciting destinations, hidden gems, and unforgettable experiences to make every journey special.",
        icon: Plane,
        link: "/"
    },
]

const Features = () => {

    const navigate = useNavigate();

    return (
        <div className='px-20 py-24'>
            {/* heading */}
            <div>
                <h2 onClick={()=>{navigate("/features")}} className='text-4xl font-bold text-center'>Features</h2>
            </div>

            {/* content  */}
            <div className='grid grid-cols-4 gap-6 mt-20'>
                {
                    featuresData.map((feature, index)=>{
                        return (
                            <div onClick={()=>{navigate(feature.link)}} className='border rounded p-4 border-gray-300'>

                                <feature.icon size={40} className="text-blue-600 mb-4" />
                                
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p>{feature.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Features