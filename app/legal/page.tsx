import Link from "next/link";

export default function Legal() {
  return (
    <div className="min-h-screen pl-4 pt-2 pb-8">
      <div className="max-w-5xl rounded-md">
        <h1 className="scroll-m-20 text-4xl mb-4 font-extrabold tracking-tight lg:text-6xl">
          Mentions légales
        </h1>
        <p className="mb-4">
          Dernière mise à jour : <strong>09/01/2025</strong>
        </p>
        <p className="mb-4">
          Ce site internet est exploité par <strong>Slim OURLISSENE</strong>,
          auto-entrepreneur sous le nom de CheckInPro. Dans tout le site, les
          termes « nous », « notre » et « nos » font référence à CheckInPro.
          Nous proposons ce site, y compris toutes les informations, outils et
          services qui y sont disponibles, sous réserve de votre acceptation de
          toutes les conditions, politiques et mentions légales énoncées ici.
        </p>
        <p className="mb-4">
          En visitant notre site, vous acceptez d’être lié par ces mentions
          légales. Si vous n’êtes pas d’accord avec l’ensemble des termes et
          conditions, vous ne pouvez pas accéder à notre site ou utiliser nos
          services.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Informations légales</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Nom de l’exploitant : Slim OURLISSENE</li>
          <li>Statut : Auto-entrepreneur </li>
          <li>Adresse : Paris, France </li>
          <li>
            Email :{" "}
            <Link href="mailto:contact@checkinpro.fr" className="text-blue-600">
              contact@checkinpro.fr
            </Link>{" "}
          </li>
          <li>SIRET : 90280569600017</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Hébergement</h2>
        <p className="mb-4">
          Ce site est hébergé par <strong>Vercel Inc.</strong>, situé au 650
          California St San Francisco, CA 94108, United States. Pour toute
          question relative à l’hébergement, vous pouvez consulter le site de
          l’hébergeur à l’adresse suivante :{" "}
          <Link
            href="https://vercel.com"
            target="_blank"
            className="text-blue-600"
          >
            vercel.com
          </Link>
          .
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Responsable de la publication
        </h2>
        <p className="mb-4">
          Le responsable de la publication est <strong>Slim OURLISSENE</strong>,
          en qualité de représentant légal de CheckInPro.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Accès au site</h2>
        <p className="mb-4">
          L’accès au site est réservé aux utilisateurs autorisés, principalement
          les entreprises clientes et leurs employés. Toute utilisation non
          autorisée du site est strictement interdite et pourra faire l’objet de
          poursuites judiciaires.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Propriété intellectuelle
        </h2>
        <p className="mb-4">
          Tous les éléments de ce site (textes, graphismes, logos, images,
          vidéos, logiciels, etc.) sont protégés par le droit de la propriété
          intellectuelle et sont la propriété exclusive de CheckInPro, sauf
          indication contraire. Toute reproduction, distribution, modification
          ou utilisation de ces éléments, sans autorisation écrite préalable,
          est strictement interdite.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Limitation de responsabilité
        </h2>
        <p className="mb-4">
          CheckInPro s’efforce de maintenir les informations de ce site exactes
          et à jour. Toutefois, nous ne garantissons pas l’exactitude, la
          complétude ou l’actualité des informations fournies. L’utilisation du
          site se fait sous votre entière responsabilité. CheckInPro ne pourra
          être tenu responsable de tout dommage résultant de l’utilisation ou de
          l’incapacité à utiliser le site.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Données personnelles</h2>
        <p className="mb-4">
          Pour plus d’informations sur la collecte et l’utilisation de vos
          données personnelles, veuillez consulter notre{" "}
          <Link href="/privacy" className="text-blue-600">
            Politique de Confidentialité
          </Link>
          .
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p className="mb-4">
          Pour toute question relative à ces mentions légales ou à l’utilisation
          du site, vous pouvez nous contacter à l’adresse suivante :{" "}
          <Link href="mailto:contact@checkinpro.fr" className="text-blue-600">
            contact@checkinpro.fr
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
