import React from 'react'
import { Link } from 'gatsby'

export const DemoLink = ({ dark = false, className = '' }: { dark?: boolean; className?: string }): JSX.Element => {
    return dark ? (
        <Link
            to="/book-a-demo"
            className={` ${className} text-[15px] group font-semibold text-white py-2 px-3 rounded-sm hover:text-white hover:bg-white/30 inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98]`}
        >
            <svg
                width="24"
                height="17"
                viewBox="0 0 24 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-50 group-hover:text-white"
            >
                <path
                    d="M3.105 0.499996C2.21906 0.499996 1.5 1.22 1.5 2.105V13.9999H0V15.4558C0 16.308 0.691872 16.9999 1.54406 16.9999H22.3182C23.2473 16.9999 24.0001 16.2471 24.0001 15.318V13.9999H22.5001V2.05244C22.5001 1.19744 21.8026 0.499924 20.9476 0.499924L3.105 0.499996ZM3.105 2L20.9999 2.0525V13.9999H13.4737C13.4662 14.8249 12.7912 15.4999 11.9653 15.4999C11.1375 15.4999 10.4625 14.8268 10.4568 13.9999H3.00002V2.10506C3.00002 2.04693 3.0469 2.00006 3.10502 2.00006L3.105 2ZM12.0347 3.5C10.3744 3.5 9.0234 4.86406 9.0234 6.54416C9.0234 7.94854 9.97214 9.1232 11.25 9.47384C9.14246 9.68384 7.22155 10.7816 5.95867 12.4916H10.0161C10.2833 12.4869 10.557 12.486 10.8364 12.4916H13.3209C13.5037 12.4888 13.6847 12.4897 13.8628 12.4916H18.0169C16.7691 10.7994 14.8811 9.70544 12.7989 9.47672C14.0861 9.13172 15.0432 7.9542 15.0432 6.54416C15.0442 4.86416 13.6961 3.5 12.0358 3.5H12.0347Z"
                    fill="currentColor"
                />
            </svg>

            <span>Schedule a call</span>
        </Link>
    ) : (
        <Link
            to="/book-a-demo"
            className={` ${className} text-[15px] group font-semibold text-blue py-2 px-3 rounded-sm hover:text-blue hover:bg-blue/10 inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98]`}
        >
            <svg
                width="24"
                height="17"
                viewBox="0 0 24 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-30 group-hover:text-blue"
            >
                <path
                    d="M3.105 0.499996C2.21906 0.499996 1.5 1.22 1.5 2.105V13.9999H0V15.4558C0 16.308 0.691872 16.9999 1.54406 16.9999H22.3182C23.2473 16.9999 24.0001 16.2471 24.0001 15.318V13.9999H22.5001V2.05244C22.5001 1.19744 21.8026 0.499924 20.9476 0.499924L3.105 0.499996ZM3.105 2L20.9999 2.0525V13.9999H13.4737C13.4662 14.8249 12.7912 15.4999 11.9653 15.4999C11.1375 15.4999 10.4625 14.8268 10.4568 13.9999H3.00002V2.10506C3.00002 2.04693 3.0469 2.00006 3.10502 2.00006L3.105 2ZM12.0347 3.5C10.3744 3.5 9.0234 4.86406 9.0234 6.54416C9.0234 7.94854 9.97214 9.1232 11.25 9.47384C9.14246 9.68384 7.22155 10.7816 5.95867 12.4916H10.0161C10.2833 12.4869 10.557 12.486 10.8364 12.4916H13.3209C13.5037 12.4888 13.6847 12.4897 13.8628 12.4916H18.0169C16.7691 10.7994 14.8811 9.70544 12.7989 9.47672C14.0861 9.13172 15.0432 7.9542 15.0432 6.54416C15.0442 4.86416 13.6961 3.5 12.0358 3.5H12.0347Z"
                    fill="currentColor"
                />
            </svg>

            <span>Schedule a call</span>
        </Link>
    )
}
