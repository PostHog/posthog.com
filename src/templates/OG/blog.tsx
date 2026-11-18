import React from 'react'

export type BlogAuthor = {
    name: string
    role?: string
    image?: string
}

type BlogOgProps = {
    title: string
    image?: string
    author?: BlogAuthor
}

export const BLOG_WORDMARK = 'blog-wordmark'

export const BlogOg = ({ title, image, author }: BlogOgProps) => (
    <div
        style={{
            width: 1200,
            height: 630,
            position: 'relative',
            display: 'flex',
            color: 'white',
            fontFamily: 'MatterVF',
            backgroundColor: 'white',
        }}
    >
        {image ? (
            <img
                src={image}
                width={1200}
                height={630}
                style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
            />
        ) : null}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1200,
                height: 630,
                backgroundImage:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0.55) 100%)',
            }}
        />
        <div
            style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                height: '100%',
                paddingTop: 40,
                paddingRight: 57,
                paddingBottom: 22,
                paddingLeft: 57,
            }}
        >
            <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%' }}>
                <div style={{ fontSize: 72, fontWeight: 700, margin: 0 }}>{title}</div>
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {author ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    marginRight: 15,
                                    width: 100,
                                    height: 100,
                                    overflow: 'hidden',
                                    borderRadius: 50,
                                    backgroundColor: '#f7a600',
                                    display: 'flex',
                                }}
                            >
                                {author.image ? (
                                    <img src={author.image} width={100} height={100} style={{ objectFit: 'cover' }} />
                                ) : null}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>{author.name}</div>
                                {author.role ? (
                                    <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.75, margin: 0 }}>
                                        {author.role}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                        <div />
                    )}
                    <img src={BLOG_WORDMARK} width={251} height={48} />
                </div>
            </div>
        </div>
    </div>
)
