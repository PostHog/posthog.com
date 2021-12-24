import React, { useEffect, useState } from 'react'

export default function Avatar({ image }) {
    return (
        <div className="bg-gray-accent-light rounded-full w-[40px] h-[40px] overflow-hidden">
            <img src={image || '/images/avatar.png'} width="40" height="40" />
        </div>
    )
}
