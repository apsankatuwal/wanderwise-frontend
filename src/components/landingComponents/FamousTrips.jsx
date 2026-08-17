import React from 'react'
import { useNavigate } from 'react-router-dom'

const tripsData = [
    {
        title: "Boudha Stupa",
        content: "Boudhanath Stupa, a UNESCO World Heritage Site and one of the largest stupas in Nepal.",
        Image: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/about"
    },
    {
        title: "Phewa Lake",
        content: "A serene view of Phewa Lake in Pokhara, Nepal, with the reflection of the surrounding mountains.",
        Image: "https://images.unsplash.com/photo-1562462181-b228e3cff9ad?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/features"
    },
    {
        title: "Illam Tea Gardens",
        content: "Experience the beauty of the lush tea plantations in Illam, known for their vibrant green tea leaves.",
        Image: "https://images.unsplash.com/photo-1602102488252-c4c3daadf1c2?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/contact"
    },
    {
        title: "Chitwan",
        content: "Explore the wildlife and natural beauty of Chitwan National Park, a UNESCO World Heritage Site.",
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
            <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6 mt-20'>
                {
                    tripsData.map((feature, index)=>{
                        return (
                            <div onClick={()=>{navigate(feature.link)}} className='border rounded p-4 border-gray-300 md:bg-blue-200 bg-green-300 '>

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