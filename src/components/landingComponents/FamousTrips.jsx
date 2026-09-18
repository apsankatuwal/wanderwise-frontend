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
        <div className='px-6 py-24 sm:px-10 lg:px-20'>
            {/* heading */}
            <div className="text-center">
                <h2 className='text-4xl font-bold tracking-tight text-slate-900'>Famous Trips</h2>
                <p className="mt-3 text-slate-500">A few favorite destinations to get you started.</p>
            </div>

            {/* content  */}
            <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                {
                    tripsData.map((trip, index) => {
                        return (
                            <div
                                key={trip.title}
                                onClick={() => { navigate(trip.link) }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        navigate(trip.link);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            >
                                <div className='h-48 w-full overflow-hidden'>
                                    <img
                                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                        src={trip.Image}
                                        alt={trip.title}
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="mb-2 text-lg font-semibold text-slate-900">{trip.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{trip.content}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FamousTrips