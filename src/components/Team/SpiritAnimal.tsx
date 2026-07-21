import { Fieldset } from 'components/OSFieldset'
import { OSSelect, OSTextarea } from 'components/OSForm'
import React, { useEffect, useState } from 'react'
import qs from 'qs'

const spiritAnimals = [
    { emoji: '🐜', name: 'Ant' },
    { emoji: '🦡', name: 'Badger' },
    { emoji: '🦇', name: 'Bat' },
    { emoji: '🐻', name: 'Bear' },
    { emoji: '🦫', name: 'Beaver' },
    { emoji: '🐝', name: 'Bee' },
    { emoji: '🦬', name: 'Bison' },
    { emoji: '🐦', name: 'Bird' },
    { emoji: '🐈‍⬛', name: 'Black cat' },
    { emoji: '🐡', name: 'Blowfish' },
    { emoji: '🐗', name: 'Boar' },
    { emoji: '🦋', name: 'Butterfly' },
    { emoji: '🐫', name: 'Camel' },
    { emoji: '🐈', name: 'Cat' },
    { emoji: '🐔', name: 'Chicken' },
    { emoji: '🐿', name: 'Chipmunk' },
    { emoji: '🦀', name: 'Crab' },
    { emoji: '🐊', name: 'Crocodile' },
    { emoji: '🦌', name: 'Deer' },
    { emoji: '🐕', name: 'Shiba Inu' },
    { emoji: '🐬', name: 'Dolphin' },
    { emoji: '🫏', name: 'Donkey' },
    { emoji: '🕊️', name: 'Dove' },
    { emoji: '🐉', name: 'Dragon' },
    { emoji: '🦆', name: 'Duck' },
    { emoji: '🦅', name: 'Eagle' },
    { emoji: '🐘', name: 'Elephant' },
    { emoji: '🐀', name: 'Rat' },
    { emoji: '🐟', name: 'Fish' },
    { emoji: '🦩', name: 'Flamingo' },
    { emoji: '🪰', name: 'Fly' },
    { emoji: '🦊', name: 'Fox' },
    { emoji: '🐸', name: 'Frog' },
    { emoji: '🦒', name: 'Giraffe' },
    { emoji: '🐐', name: 'Goat' },
    { emoji: '🪿', name: 'Goose' },
    { emoji: '🦍', name: 'Gorilla' },
    { emoji: '🦮', name: 'Labrador' },
    { emoji: '🦔', name: 'Hedgehog' },
    { emoji: '🦛', name: 'Hippopotamus' },
    { emoji: '🐎', name: 'Horse' },
    { emoji: '🪼', name: 'Jellyfish' },
    { emoji: '🦘', name: 'Kangaroo' },
    { emoji: '🐨', name: 'Koala' },
    { emoji: '🐞', name: 'Ladybug' },
    { emoji: '🐆', name: 'Leopard' },
    { emoji: '🦁', name: 'Lion' },
    { emoji: '🦎', name: 'Lizard' },
    { emoji: '🦙', name: 'Llama' },
    { emoji: '🦣', name: 'Mammoth' },
    { emoji: '🐒', name: 'Monkey' },
    { emoji: '🫎', name: 'Moose' },
    { emoji: '🐁', name: 'Mouse' },
    { emoji: '🐙', name: 'Octopus' },
    { emoji: '🦧', name: 'Orangutan' },
    { emoji: '🦦', name: 'Otter' },
    { emoji: '🦉', name: 'Owl' },
    { emoji: '🐂', name: 'Ox' },
    { emoji: '🐼', name: 'Panda' },
    { emoji: '🦜', name: 'Parrot' },
    { emoji: '🦚', name: 'Peacock' },
    { emoji: '🐧', name: 'Penguin' },
    { emoji: '🐖', name: 'Pig' },
    { emoji: '🐻‍❄️', name: 'Polar bear' },
    { emoji: '🐩', name: 'Poodle' },
    { emoji: '🐇', name: 'Rabbit' },
    { emoji: '🦝', name: 'Raccoon' },
    { emoji: '🏎️', name: 'Racecar' },
    { emoji: '🐏', name: 'Ram' },
    { emoji: '🦏', name: 'Rhinoceros' },
    { emoji: '🐓', name: 'Rooster' },
    { emoji: '🦕', name: 'Sauropod' },
    { emoji: '🦂', name: 'Scorpion' },
    { emoji: '🦭', name: 'Seal' },
    { emoji: '🦈', name: 'Shark' },
    { emoji: '🐑', name: 'Sheep' },
    { emoji: '🦐', name: 'Shrimp' },
    { emoji: '🦨', name: 'Skunk' },
    { emoji: '🦥', name: 'Sloth' },
    { emoji: '🐌', name: 'Snail' },
    { emoji: '🐍', name: 'Snake' },
    { emoji: '🕷️', name: 'Spider' },
    { emoji: '🐳', name: 'Spouting whale' },
    { emoji: '🦑', name: 'Squid' },
    { emoji: '🦢', name: 'Swan' },
    { emoji: '🦖', name: 'T-Rex' },
    { emoji: '🐅', name: 'Tiger' },
    { emoji: '🐠', name: 'Tropical fish' },
    { emoji: '🦃', name: 'Turkey' },
    { emoji: '🐢', name: 'Turtle' },
    { emoji: '🦄', name: 'Unicorn' },
    { emoji: '🐃', name: 'Water buffalo' },
    { emoji: '🐋', name: 'Whale' },
    { emoji: '🐺', name: 'Wolf' },
    { emoji: '🦓', name: 'Zebra' },
    { emoji: '🦤', name: 'Dodo' },
]

const SpiritAnimalForm = ({
    spiritAnimal,
    setFieldValue,
}: {
    spiritAnimal: { animal: string; description: string } | null
    setFieldValue: (field: string, value: any) => void
}) => {
    const [takenAnimals, setTakenAnimals] = useState([])

    useEffect(() => {
        const fetchTakenAnimals = async () => {
            try {
                const query = qs.stringify({
                    filter: {
                        profiles: {
                            id: {
                                $ne: null,
                            },
                        },
                    },
                    populate: 'spiritAnimal',
                    pagination: {
                        limit: 100,
                    },
                })
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${query}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const takenAnimals = data.data
                            .map((team: any) => team.attributes.spiritAnimal?.animal)
                            .filter(Boolean)
                        setTakenAnimals(takenAnimals)
                    })
            } catch (err) {
                console.error(err)
            }
        }

        fetchTakenAnimals()
    }, [])

    return (
        <div>
            <OSSelect
                size="sm"
                label="Spirit animal"
                direction="column"
                options={spiritAnimals
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((animal) => {
                        const name = `${animal.emoji} ${animal.name}`
                        return {
                            label: name,
                            value: name,
                            disabled: takenAnimals.includes(`${animal.emoji} ${animal.name}`),
                        }
                    })}
                onChange={(value) => {
                    setFieldValue('spiritAnimal.animal', value)
                }}
                value={spiritAnimal?.animal}
            />
            <div className="[&_label]:font-normal">
                <OSTextarea
                    placeholder="Why is this your spirit animal?"
                    rows={3}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setFieldValue('spiritAnimal.description', e.target.value)
                    }}
                    value={spiritAnimal?.description || ''}
                    label="Description"
                    direction="column"
                />
            </div>
            {spiritAnimal && (
                <div className="flex justify-end mt-1.5">
                    <button
                        onClick={() => {
                            setFieldValue('spiritAnimal', null)
                        }}
                        className="text-sm text-red font-bold"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    )
}

export default function SpiritAnimal({
    spiritAnimal,
    editing,
    setFieldValue,
}: {
    spiritAnimal: { animal: string; description: string } | null
    editing: boolean
    setFieldValue: (field: string, value: any) => void
}): JSX.Element | null {
    return editing ? (
        <SpiritAnimalForm spiritAnimal={spiritAnimal} setFieldValue={setFieldValue} />
    ) : (
        spiritAnimal && (
            <Fieldset legend="Spirit animal">
                <h4 className="!m-0">{spiritAnimal.animal}</h4>
                <p className="m-0 text-sm">{spiritAnimal.description}</p>
            </Fieldset>
        )
    )
}
