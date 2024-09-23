import React from 'react'
import Masonry from 'react-masonry-css'
import { StaticImage } from 'gatsby-plugin-image'

// Define the type for our benefit items
interface BenefitItem {
  title: string;
  description: string;
  additionalInfo?: string;
  image: React.ReactElement;
  caption?: string;
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
    additionalInfo: '<p class="font-bold text-sm mb-1">Off-site history</p><div class="grid grid-cols-2 divide-y divide-light dark:divide-dark text-sm [&_*]:py-0.5"><strong>Year</strong><strong class="!border-t-0">Location</strong><div>2024</div><div>Mykonos</div><div>2023</div><div>Aruba</div><div>2022</div><div>Iceland</div><div>2021</div><div>Portugal</div><div>2020</div><div>Tuscany</div></div>',
    image: <StaticImage src="./images/mykonos.png" alt="" />,
    caption: "Hackathoning poolside in Mykonos"
  },
  {
    title: "Small-team off-sites",
    description: "You'll meet up with your small team somewhere fun periodically. Sometimes multiple small teams get together. We have a special budget for you to do this.",
    additionalInfo: "<p>Recent small team off-sites took place in Bologna, Italy, Austin, TX, and Palm Springs, CA.</p>",
    image: <StaticImage src="./images/austin.png" alt="" />,
    caption: "Cruising down Lake Austin in Texas"
  },
  {
    title: "Local meetup budget",
    description: "You're encouraged to meet up with other team members who you don't work with on a regular basis with a generous quarterly budget.",
    additionalInfo: "<p></p>",
    image: <StaticImage src="./images/cambridge.png" alt="" />,
    caption: "Meeting up in Cambridge, UK"
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
    image: <StaticImage src="./images/hedgehouse.png" alt="" />,
    caption: "Working from the Hedge House"
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
      <h2 className="text-center text-5xl mb-2"><em className="text-red dark:text-yellow">Unexpected</em> benefits</h2>
      <p className="text-center font-semibold opacity-75">Perks you'll only find here</p>

      <div className="grid md:grid-cols-2 md:items-center md:gap-8">
        <aside className="order-2 md:order-1 relative">
          <div className="dark:hidden">
            <StaticImage src="./images/meeting-free-days.png" alt="Calendar with two glorious days of no meetings" />
          </div>
          <div className="hidden dark:block">
            <StaticImage src="./images/meeting-free-days-dark.png" alt="Calendar with two glorious days of no meetings" />
          </div>
          <div className="lg:hidden absolute left-0 bottom-0 z-10">
            <StaticImage src="./images/police-hog.png" alt="Police hog sez..." className="w-[106px] -scale-x-1" />
            <StaticImage src="./images/police-hog-quote.png" alt="Look at all those empty time slots!" className="w-[194px] -ml-4" />
          </div>
        </aside>
        <div className="order-1 md:order-2 relative">
          <h3 className="text-3xl md:text-4xl mb-1"><span className="text-red dark:text-yellow">Two meeting-free days</span> per week</h3>
          <p className="max-w-lg mb-3">After extensive research, we've found the best way to ship fast is to have fewer meetings.</p>

          <p className="text-sm opacity-75 max-w-lg mb-3">
            *Illustration is not indicative of an product engineer’s calendar at PostHog. We actually have relatively few meetings.
          </p>

          <div className="hidden lg:block">
            <StaticImage src="./images/police-hog.png" alt="Police hog sez..." className="w-[106px] mt-10" />
            <StaticImage src="./images/police-hog-quote.png" alt="Look at all those empty time slots!" className="w-[194px] -ml-4" />
          </div>
        </div>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-8 w-auto"
        columnClassName="my-masonry-grid_column pl-8 bg-clip-padding"
      >
        {benefitItems.map((item, index) => (
          <div key={index} className="bg-accent dark:bg-accent-dark rounded-md mb-8">
            <div className="relative rounded-tl-md rounded-tr-md overflow-hidden">
              {item.image}
              {item.caption && <div className="absolute bottom-0 left-0 w-full text-white bg-gradient-to-b from-black/0 to-black/50 p-2 pt-8 text-sm">{item.caption}</div>}
            </div>
            <div className="p-4">
              <h3 className="text-xl mb-1">{item.title}</h3>
              <p className="mb-2 text-[15px]">{item.description}</p>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
              />
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  )
}

export default BenefitsUnexpected
