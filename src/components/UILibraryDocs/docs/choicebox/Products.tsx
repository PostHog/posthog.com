import React, { useState } from 'react'
import { Choicebox } from 'components/UI/Choicebox'

export default function Products(): JSX.Element {
    const [products, setProducts] = useState(['analytics'])
    return (
        <div className="w-full">
            <Choicebox.Group multiple aria-label="Products" value={products} onValueChange={setProducts}>
                <Choicebox.Item value="analytics">
                    <Choicebox.Title>Product analytics</Choicebox.Title>
                    <Choicebox.Description>Understand how people use your product.</Choicebox.Description>
                </Choicebox.Item>
                <Choicebox.Item value="replay">
                    <Choicebox.Title>Session replay</Choicebox.Title>
                    <Choicebox.Description>Watch user sessions.</Choicebox.Description>
                </Choicebox.Item>
                <Choicebox.Item value="flags">
                    <Choicebox.Title>Feature flags</Choicebox.Title>
                    <Choicebox.Description>Control access to new features.</Choicebox.Description>
                </Choicebox.Item>
            </Choicebox.Group>
            <p className="mb-0 mt-3 text-sm text-secondary">Selected: {products.join(', ') || 'None'}</p>
        </div>
    )
}
