import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

import "./style.scss";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import { useData } from "../../contexts/DataContext";
import ModalEvent from "../../containers/ModalEvent";

/* 
  Ce composant `Page` représente la page d'accueil de l'application.
  Il intègre plusieurs composants pour afficher des fonctionnalités et des contenus spécifiques.
  
  Principaux éléments :
  - `Menu`: Composant de menu de navigation.
  - `Slider`: Composant pour afficher un carrousel d'images ou de contenus.
  - `ServiceCard`: Composant pour afficher des cartes de présentation de services avec des descriptions.
  - `EventList`: Composant pour afficher une liste d'événements.
  - `PeopleCard`: Composant pour afficher des cartes de profil de membres de l'équipe.
  - `Form`: Composant de formulaire de contact.
  - `Modal`: Composant pour afficher des modales interactives.

  Points à retenir :
  - Assure-toi que les chemins des images (`imageSrc`) utilisés dans les composants sont corrects et accessibles.
  - Vérifie que le contexte `DataContext` est correctement utilisé pour récupérer les données (`last`) nécessaires pour afficher la dernière prestation dans le pied de page.
  - Veille à ce que les actions comme l'envoi de formulaires (`Form`) et l'interaction avec les modales (`Modal`) fonctionnent comme prévu.
*/


const Page = () => {
  // CORRECTION AJOUT DE "data" à la place de last
  const { data } = useData();
  // CORRECTION (utilisation de la variable last car nécéssité -> voir EventCard)
  const last = data?.events?.length > 0
  ? data.events.reduce((latest, current) => {
      const latestDate = new Date(latest.date);
      const currentDate = new Date(current.date);
      return currentDate > latestDate ? current : latest;
    })
  : null;

  return <>
    <header>
      <Menu />
    </header>
    <main>
      <section className="SliderContainer">
        <Slider />
      </section>
      <section className="ServicesContainer">
        {/* ajout des différents id pour lier aux ancres du menus */}
        <h2 className="Title" id='nos-services'>Nos services</h2>
        <p>Nous organisons des événements sur mesure partout dans le monde</p>
        <div className="ListContainer">
          <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
            <h3>Soirée d’entreprise</h3>
            Une soirée d’entreprise vous permet de réunir vos équipes pour un
            moment convivial afin de valoriser votre société en projetant une
            image dynamique. Nous vous proposons d’organiser pour vous vos
            diners et soirée d’entreprise
          </ServiceCard>
          <ServiceCard imageSrc="/images/hall-expo.png">
            <h3>Conférences</h3>
            724 events vous propose d’organiser votre évènement, quelle que soit
            sa taille, en s’adaptant à votre demande et à vos demandes. En tant
            que spécialistes de l’évènementiel, nous saurons trouver le lieu
            parfait ainsi que des solutions inédites pour capter votre audience
            et faire de cet évènement un succès
          </ServiceCard>
          <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
            <h3>Experience digitale</h3>
            Notre agence experte en contenus immersifs offre des services de
            conseil aux entreprises, pour l’utilisation de la réalité virtuelle,
            de la réalité augmentée et de la réalité mixte de l’animation
            événementielle, à la veille technologique jusqu’au développement de
            module de formation innovant
          </ServiceCard>
        </div>
      </section>
      <section className="EventsContainer">
        <h2 className="Title" id='nos-realisations'>Nos réalisations</h2>
        <EventList />
      </section>
      <section className="PeoplesContainer">
        <h2 className="Title" id='notre-equipe'>Notre équipe</h2>
        <p>Une équipe d’experts dédiés à l’ogranisation de vos événements</p>
        <div className="ListContainer">
          <PeopleCard
            imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
            name="Samira"
            position="CEO"
          />
          <PeopleCard
            imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
            name="Jean-baptiste"
            position="Directeur marketing"
          />
          <PeopleCard
            imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png"
            name="Alice"
            position="CXO"
          />
          <PeopleCard
            imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png"
            name="Luís"
            position="Animateur"
          />
          <PeopleCard
            imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png"
            name="Christine"
            position="VP animation"
          />
          <PeopleCard
            imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png"
            name="Isabelle"
            position="VP communication"
          />
        </div>
      </section>
      <div className="FormContainer" id="contact">
        <h2 className="Title">Contact</h2>
        <Modal
          Content={
            <div className="ModalMessage--success">
              <div>Message envoyé !</div>
              <p>
                Merci pour votre message nous tâcherons de vous répondre dans
                les plus brefs délais.
              </p>
            </div>
          }
        >
          {({ setIsOpened }) => (
            <Form
              onSuccess={() => setIsOpened(true)}
              onError={() => null}
            />
          )}
        </Modal>
      </div>
    </main>
    <footer className="row">
      <div className="col presta">
        <h3>Notre derniére prestation</h3>
        {/* Failed prop type: The prop `imageSrc`/`title`is required */}
        {/* Ajout de last */}
        {/* copie du système modal présent dans le composant event, modification avec last et import */}
        {last && (
          <Modal key={last.id} Content={<ModalEvent event={last} />}>
          {({ setIsOpened }) => (
        <EventCard
        onClick={() => setIsOpened(true)}
          imageSrc={last?.cover}
          title={last?.title}
          date={new Date(last?.date)}
          small
          label="boom"
        />
      )}
      </Modal>
      )}
      </div>
      <div className="col contact">
        <h3>Contactez-nous</h3>
        <address>45 avenue de la République, 75000 Paris</address>
        <div>01 23 45 67 89</div>
        <div>contact@724events.com</div>
        <div>
          <a href="#twitch">
            <Icon name="twitch" />
          </a>
          <a href="#facebook">
            <Icon name="facebook" />
          </a>
          <a href="#twitter">
            <Icon name="twitter" />
          </a>
          <a href="#youtube">
            <Icon name="youtube" />
          </a>
        </div>
      </div>
      <div className="col description">
        <Logo size="large" />
        <p>
          Une agence événementielle propose des prestations de service
          spécialisées dans la conception et l&apos;organisation de divers événements
          tels que des événements festifs, des manifestations sportives et
          culturelles, des événements professionnels.
        </p>
      </div>
    </footer>
  </>
}

export default Page;
