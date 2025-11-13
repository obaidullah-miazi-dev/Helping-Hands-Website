import Banner from "../components/Banner";
import CompletedEvent from "../components/CompletedEvent";
import Container from "../components/Container";
import Features from "../components/Features";
import Newsletter from "../components/Newsletter";
import { Card, Carousel } from "../components/ui/apple-cards-carousel";

const Home = () => {
  const items = [
    <Card
      key={1}
      index={0}
      card={{
        category: "Community Welfare",
        title: "Community Food Sharing Day",
        content:
          "A community gathering where people bring home-cooked meals and share them with others in a friendly, open environment. The event promotes unity, kindness, and mutual respect among neighbors. There are no social divisions—everyone sits together, eats together, and enjoys the moment. This event encourages empathy and care, especially for those who may be less fortunate.",
        src: "https://getmainelobster.com/cdn/shop/articles/shared-food_1.webp?v=1746116012",
      }}
    />,
    <Card
      key={2}
      index={1}
      card={{
        category: "Health & Humanity",
        title: "Blood Donation & Health Awareness Camp",
        content:
          "This event focuses on helping save lives and spreading awareness about personal health. Medical professionals and volunteers organize free health check-ups and encourage people to donate blood. Participants also receive guidance on maintaining a healthy lifestyle. The event inspires social responsibility and teaches the value of compassion and community support.",
        src: "https://surgmedia.com/wp-content/uploads/2020/10/2171-blood-donation.jpg",
      }}
    />,
    <Card
      key={3}
      index={2}
      card={{
        category: "Environment & Social Responsibility",
        title: "Clean & Green Neighborhood Mission",
        content:
          "A community-driven program dedicated to cleaning public areas such as roads, parks, and community centers while promoting a greener lifestyle. Participants plant trees, reduce plastic usage, and learn about waste management. The event helps build a cleaner environment and encourages community members to take pride in the place they live.",
        src: "https://weewatch.com/wp-content/uploads/2024/04/blog-image-New-size-1.png",
      }}
    />,
    <Card
      key={4}
      index={3}
      card={{
        category: "Arts & Culture",
        title: "Cultural Harmony Night",
        content:
          "A joyful evening where people of all ages come together to celebrate music, dance, poetry, theater, and other cultural expressions. Participants showcase traditional clothing, music, and stories. The event builds cultural awareness, strengthens friendships, and connects generations through shared heritage and creativity.",
        src: "https://www.thefridaytimes.com/digital_images/large/2025-10-13/night-harmony-music-unites-cultures-historic-peshawar-museum-1760367990-5909.png",
      }}
    />,
    <Card
      key={5}
      index={4}
      card={{
        category: "Education & Career Development",
        title: "Youth Skill Development Workshop",
        content:
          "A series of hands-on training sessions focused on building practical skills for young people. This may include communication skills, digital literacy, job preparation, leadership training, and entrepreneurship basics. The goal is to empower youth to become confident, independent, and future-ready.",
        src: "https://ecdn.dhakatribune.net/contents/cache/images/640x359x1/uploads/dten/2019/10/dt-actioaid-round-table-rajibdhar-8236-1571070374693.jpg",
      }}
    />,
    <Card
      key={6}
      index={5}
      card={{
        category: "Social Care",
        title: "Elderly Care & Respect Day",
        content:
          "An event dedicated to showing appreciation and care to senior citizens. Participants spend time listening to their stories, offering assistance, giving small gifts, and acknowledging their contributions to society. This helps strengthen emotional bonds and encourages younger generations to respect and value elders.",
        src: "https://img.freepik.com/free-photo/older-couple-retirement-home-holding-hands_23-2147817052.jpg?semt=ais_hybrid&w=740&q=80",
      }}
    />,
  ];

  return (
    <div>
      <Banner></Banner>
      <CompletedEvent></CompletedEvent>

      <Features></Features>

      <div className="p-4">
        <Container>
          <h2
            className="md:text-7xl text-4xl text-primary
         font-bold  border-l-8 border-primary pl-3 mb-8"
          >
            Event Gallery
          </h2>
        </Container>
        <Carousel items={items} initialScroll={0}></Carousel>
      </div>

      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
