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
        <div className='px-6 py-24 sm:px-10 lg:px-20'>
            {/* heading */}
            <div className="text-center">
                <h2 className='text-4xl font-bold tracking-tight text-slate-900'>Features</h2>
                <p className="mt-3 text-slate-500">Everything you need to plan your next trip, in one place.</p>
            </div>

            {/* content  */}
            <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {
                    featuresData.map((feature, index) => {
                        return (
                            <div
                                key={feature.title}
                                onClick={() => { navigate(feature.link) }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        navigate(feature.link);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 transition-colors group-hover:bg-sky-100">
                                    <feature.icon size={22} className="text-sky-700" />
                                </div>

                                <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-500">{feature.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Features