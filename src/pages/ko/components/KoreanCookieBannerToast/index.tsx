import React, { useEffect, useRef } from 'react'
import { IconX } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { useToast } from '../../../../context/Toast'

const COOKIE_BANNER_TITLE = 'Legally-required cookie banner'

export default function KoreanCookieBannerToast(): null {
    const { addToast, removeToast, toasts } = useToast()
    const replacedToastIds = useRef<Set<number>>(new Set())

    useEffect(() => {
        const cookieToast = toasts.find((toast) => {
            return (
                toast.title === COOKIE_BANNER_TITLE && toast.createdAt && !replacedToastIds.current.has(toast.createdAt)
            )
        })

        if (!cookieToast?.createdAt) return

        replacedToastIds.current.add(cookieToast.createdAt)
        removeToast(cookieToast.createdAt)

        addToast({
            ...cookieToast,
            title: '쿠키 안내 타임',
            description: (
                <>
                    <p className="mt-1">PostHog.com은 서드파티 쿠키를 쓰지 않습니다. 자체 쿠키 하나만 씁니다.</p>
                    <p>
                        데이터는 제3자에게 보내지 않습니다. (
                        <Tooltip
                            trigger={
                                <span className="border-b border-primary border-dashed">쿠키에 진심인 분들도</span>
                            }
                            delay={0}
                        >
                            <div className="max-w-64">
                                <span className="text-sm">추적 쿠키를 싫어하는 인터넷 고인물까지 포함합니다.</span>
                            </div>
                        </Tooltip>{' '}
                        흐뭇해할 거예요.)
                    </p>
                </>
            ),
            image: undefined,
            actionLabel: '닫기',
            actionAsIcon: <IconX className="size-4" />,
        })
    }, [addToast, removeToast, toasts])

    return null
}
