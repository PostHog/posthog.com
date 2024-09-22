import React from 'react'
import Masonry from 'react-masonry-css'
import { StaticImage } from 'gatsby-plugin-image'

// Define the type for our benefit items
interface BenefitItem {
  title: string;
  description: string;
  additionalInfo?: string;
  image: React.ReactElement;
}

const benefitItems: BenefitItem[] = [
  {
    title: "Two meeting-free days per week",
    description: "After extensive research, we've found the best way to ship fast is to have fewer meetings.",
    additionalInfo: "<p></p>",
    image: <StaticImage src="./images/meeting-free-placeholder.png" alt="Look at all those empty time slots" />
  },
  {
    title: "Company off-sites in exotic locations",
    description: "Each year we organize fully paid company off-sites. The highlight is the hackathon where we team up to build things that aren't on our roadmap.",
    additionalInfo: "<p>In 2024 it was Mykonos. Before that was Aruba, Iceland, Portugal, and Tuscany.</p>",
    image: <StaticImage src="./images/meeting-free-placeholder.png" alt="" />
  },
  {
    title: "Small-team off-sites",
    description: "You'll meet up with your small team somewhere fun periodically. Sometimes multiple small teams get together. We have a special budget for you to do this.",
    additionalInfo: "<p>Recent small team off-sites took place in Bologna, Italy, Austin, TX, and Palm Springs, CA.</p>",
    image: <StaticImage src="./images/meeting-free-placeholder.png" alt="" />
  },
  {
    title: "Local meetup budget",
    description: "You're encouraged to meet up with other team members who you don't work with on a regular basis with a generous quarterly budget.",
    additionalInfo: "<p></p>",
    image: <StaticImage src="./images/meeting-free-placeholder.png" alt="" />
  },
  {
    title: "Co-working or café credit",
    description: "Use $250/mo toward a co-working space or coffee shops if that's where you do your best work. Charge it on your personal Brex (or Revolut) card.",
    additionalInfo: "<p></p>",
    image: <StaticImage src="./images/meeting-free-placeholder.png" alt="" />
  },
  {
    title: "Access to the Hedge House",
    description: "Work with co-workers (or by yourself) in Cambridge, UK and stay for free whenever you want.",
    additionalInfo: "<p></p>",
    image: <StaticImage src="./images/meeting-free-placeholder.png" alt="" />
  },
];

const BenefitsUnexpected: React.FC = () => {
  const breakpointColumnsObj = {
    1024: 2,
    640: 1,
    default: 3
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl lg:text-4xl mb-2">Unexpected benefits</h2>
      <p className="text-center font-semibold opacity-75">Perks you'll only find here</p>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-8 w-auto"
        columnClassName="my-masonry-grid_column pl-8 bg-clip-padding"
      >
        {benefitItems.map((item, index) => (
          <div key={index} className="bg-accent dark:bg-accent-dark rounded-md p-4 mb-8">
            {item.image}
            <h3 className="text-xl mt-4 mb-1">{item.title}</h3>
            <p className="mb-2 text-[15px]">{item.description}</p>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
            />
          </div>
        ))}
      </Masonry>
    </section>
  )
}

export default BenefitsUnexpected
