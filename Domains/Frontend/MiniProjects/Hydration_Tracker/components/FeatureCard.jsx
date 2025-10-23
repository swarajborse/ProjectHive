import { twMerge } from 'tailwind-merge'

const FeatureCard = ({ title, description, image, className }) => {
    return (
        <div className={twMerge("bg-blue-950/20 px-4 py-6 rounded-3xl", className)}
             style={{boxShadow: "0 0 10px #64b5f6, 0 0 20px #64b5f6"}}
        >
            <div className="aspect-video flex justify-center items-center">
                <div className="bg-[2b2b3e] border border-blue-300/30 rounded-3xl p-18 ">
                    {image}
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-medium mt-6">{title}</h3>
                <p className="text-white/70 mt-2">{description}</p>
            </div>
        </div>
    )
}

export default FeatureCard