import { infinity } from 'ldrs'

infinity.register()

export const Loader = () => {
    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                < l-infinity
                    size="250"
                    stroke="4"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3"
                    color="black"
                ></l-infinity >
            </div>
        </>
    )
}
