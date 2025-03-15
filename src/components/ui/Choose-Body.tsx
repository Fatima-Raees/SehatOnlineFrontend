import React from 'react'

export default function Body() {
    return (
        <div className='mr-[4rem] mt-[4rem]'>
            <div className='flex justify-start'>
                <div className='w-[500px] overflow-hidden'>
                    <img src="/Choose/p1.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-110'/>
                </div>
                <div className='w-[500px] mx-[1rem] overflow-hidden'>
                    <img src="/Choose/p2.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-110'/>
                </div>
                <div className='w-[500px] overflow-hidden'>
                    <img src="/Choose/p3.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-110'/>
                </div>
            </div>
            <div className='flex justify-start h-[280px] mt-[1rem]'>
                <div className='w-[500px] h-[100%] mr-[1rem] overflow-hidden'>
                    <img src="/Choose/p4.jpg" alt="IMAGE" className='object-fill transition-transform duration-900 hover:scale-110'/>
                </div>
                <div className='w-[1015px] h-[100%] overflow-hidden'>
                    <img src="/Choose/p5.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-105'/>
                </div>
            </div>
        </div>
    )
}
