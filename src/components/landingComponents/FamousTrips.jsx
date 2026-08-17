import React from 'react'
import { useNavigate } from 'react-router-dom'

const tripsData = [
    {
        title: "24*7 Availability",
        content: "Our website works 24*7 without any interruption. We guarentee 100% uptime.",
        Image: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/about"
    },
    {
        title: "Personalized Itineraries",
        content: "Create customized travel itineraries tailored to your destination, interests, and travel preferences.",
        Image: "https://images.unsplash.com/photo-1562462181-b228e3cff9ad?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/features"
    },
    {
        title: "Smart Travel Planning",
        content: "Plan your trips effortlessly with smart recommendations for destinations, activities, stays, and more.",
        Image: "https://images.unsplash.com/photo-1602102488252-c4c3daadf1c2?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/contact"
    },
    {
        title: "Discover New Experiences",
        content: "Explore exciting destinations, hidden gems, and unforgettable experiences to make every journey special.",
        Image: "https://images.unsplash.com/photo-1549888668-19281758dfbe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/"
    },
]

const FamousTrips = () => {

    const navigate = useNavigate();

    return (
        <div className='px-20 py-24'>
            {/* heading */}
            <div>
                <h2 className='text-4xl font-bold text-center'>Famous Trips</h2>
            </div>

            {/* content  */}
            <div className='grid grid-cols-4 gap-6 mt-20'>
                {
                    tripsData.map((feature, index)=>{
                        return (
                            <div onClick={()=>{navigate(feature.link)}} className='border rounded p-4 border-gray-300'>

                                <div className='w-full h-46 overflow-hidden rounded mb-4'>
                                    <img className='w-full ' src={feature.Image} alt={feature.title} />
                                </div>

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

export default FamousTrips